import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CrmConst} from '@configs/constantes';
import {Utilities} from '@utilities/utilities';
import {md5} from '@utilities/utilities/md5';

export interface Response {
    success: boolean;
    result?: any | ChallengeResopnse | LoginResponse | ListTypeResponse | DescribeResponse;
    error?: ErrorResopnse;
}

export interface ErrorResopnse {
    message: string;
    code: string;
}

export interface ChallengeResopnse {
    token: string;
    serverTime: number;
    expireTime: number;
}

export interface LoginResponse {
    sessionId: string;
    userId: string;
    version: string;
    vtigerVersion: string;
    sessionName?: string;
}

export interface ListTypeResponse {
    types: string[];
    information: InformationsDefResponse;
}

export interface InformationsDefResponse {
    [key: string]: InformationResponse;
}

export interface InformationResponse {
    isEntity: boolean;
    label: string;
    singular: string;
}

export interface DescribeResponse {
    label: string;
    name: string;
    createable: boolean;
    updateable: boolean;
    deleteable: boolean;
    retrieveable: boolean;
    fields: FieldsResponse[];
    idPrefix: string;
    isEntity: boolean;
    labelFields: string;
}

export interface FieldsResponse {
    name: string;
    label: string;
    mandatory: boolean;
    type: FieldTypeResponse;
    nullable: boolean;
    editable: boolean;
    default: string;
}

export interface FieldTypeResponse {
    name: string;
    refersTo?: string[];
    picklistValues?: PickListValuesResponse[];
    defaultValue?: string;
    format?: string;
}

export interface PickListValuesResponse {
    label: string;
    value: string;
}

@Injectable({
    providedIn: 'root'
})
export class VtigerServiceService {
    _servicebase: string;
    _apikeyBase: string;
    // TODO: Format the url before appending servicebase
    url: string;

    _serviceurl: string;
    _apikeyurl: string;
    _postTest: string;

    // Webservice user credentials
    _serviceuser: any;
    _servicekey: any;

    // Webservice login validity
    _servertime: any;
    _expiretime: any;
    _servicetoken: any;

    // Webservice login credentials
    _sessionid: any;
    _userid: any;

    // Last operation error information
    _lasterror: any;

    _isLoggin: boolean;

    httpOptions: any;

    /**
     * JSONify input data.
     */
    static toJSON (input): any {
        return JSON.parse(input);
    }


    /**
     * Get actual record id from the response id.
     */
    static getRecordId (id: string): string {
        const ids = id.split('x');
        return ids[1];
    }

    /**
     * Convert to JSON String.
     */
    static toJSONString (input): string {
        return JSON.stringify(input);
    }

    /**
     * Perform the callback now.
     */
    static __performCallback (callback, result): void {
        if (callback) {
            let callbackFunction = callback;
            let callbackArguments = false;
            if (typeof(callback) === 'object') {
                callbackFunction = callback['function'];
                callbackArguments = callback['arguments'];
            }
            if (typeof(callbackFunction) === 'function') {
                callbackFunction(result, callbackArguments);
            }
        }
    }

    /**
     * Get Result Column Names.
     */
    static getResultColumns (result): any[] {
        const columns = [];
        if (result !== null && result.length !== 0) {
            const firstrecord: any = result[0];
            for (const key in firstrecord) {
                if (firstrecord.hasOwnProperty(key)) {
                    columns.push(key);
                }
            }
        }
        return columns;
    }

    constructor(
        private http: HttpClient,
    ) {
        this._servicebase = 'webservice.php';
        this._apikeyBase = 'dashboardlogin.php';
        this._postTest = 'apiRest.php';
        // TODO: Format the url before appending servicebase
        this.url = CrmConst.vtigerUrl + '/';

        this._serviceurl =  this.url + this._servicebase;
        this._apikeyurl = this.url + this._apikeyBase;

        // Webservice user credentials
        this._serviceuser = false;
        this._servicekey = false;

        // Webservice login validity
        this._servertime = false;
        this._expiretime = false;
        this._servicetoken = false;

        // Webservice login credentials
        this._sessionid  = false;
        this._userid     = false;

        // Last operation error information
        this._lasterror  = false;

        this.getVtigerLoginData();

        this.httpOptions = {
            headers: new HttpHeaders({
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Type':  'application/json',
                // 'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }),
            withCredentials: false
        };
    }

    /**
     * Check if result has any error.
     */
    hasError (resultdata: Response, servicio?: string): boolean {
        this._lasterror = false;
        if (resultdata !== null && resultdata.success === false && resultdata.error) {
            if (resultdata.error.code) {
                this._lasterror = resultdata.error.code;
            }
            if (resultdata.error.message) {
                if (this._lasterror !== false) {
                    this._lasterror += ' : ';
                }
                this._lasterror += resultdata.error.message;
            }
            return true;
        } else if (resultdata === null || !resultdata) {
            this._lasterror = 'Sin resultado Del Servicio';
            if (servicio) {
                this._lasterror += ' : Servicio = ' + servicio;
            }
            return true;
        } else {
            this._lasterror = false;
            return false;
        }
    }

    /**
     * Get last operation error information
     */
    lastError (): any {
        return this._lasterror;
    }

    /**
     * Perform the challenge
     * @access private
     */
    private __doChallenge (username: string): Promise<any> {
        const that = this;
        return new Promise((resolve, reject) => {
            const getdataUrl = '?operation=getchallenge&username=' + username;
            that.http.get(this._serviceurl + getdataUrl)
                .toPromise()
                .then( resp => {
                    const res: Response = <Response>resp;
                    if (that.hasError(res) === false) {
                        const out: ChallengeResopnse = res.result;
                        that._servicetoken = out.token;
                        that._servertime = out.serverTime;
                        that._expiretime = out.expireTime;
                        resolve(true);
                    } else {
                        reject(that._lasterror);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Check and perform login if requried.
     */
    private __checkLogin (): boolean {
        return this._isLoggin;
    }

    private getApikey (user: string, password: string): Promise<any> {
        const that = this;
        return new Promise((resolve, reject) => {
            if (user && user.length > 0 && password && password.length > 0) {
                const payload = new FormData();
                payload.append('username', user);
                payload.append('password', password);

                that.http.post(that._apikeyurl, payload)
                    .toPromise()
                    .then(reslogin => {
                        const res: any = reslogin;
                        if (res.success === true) {
                            if (res.hasOwnProperty('apikey') && res.apikey !== null &&  res.apikey !== '') {
                                if (res.hasOwnProperty('user') && res.user !== null) {
                                    Utilities.currentUser.setCurrentUser(res.user);
                                }
                                resolve(res.apikey);
                            } else {
                                reject('Error apiKey Vacio');
                            }
                        } else {
                            reject(res.mensaje);
                        }
                        // that.__performCallback(callback, resflag);
                    })
                    .catch(error => {
                        reject(error);
                    });
            } else {
                reject('Error De Usuario y Password para el key');
            }
        });
    }

    /**
     * Do Login Operation
     */
    doDashLogin (usuario: string, password: string): Promise<any> {
        const that = this;
        return new Promise((resolve, reject) => {
            this.getApikey(usuario, password)
                .then(apikey => {
                    this.doLogin(usuario, apikey)
                        .then(res => {
                            resolve(res);
                        })
                        .catch(error => {
                            reject(error);
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }


    doLogin (username: string, accesskey: string, callback?: any): Promise<any> {
        const that = this;
        return new Promise((resolve, reject) => {
            that.__doChallenge(username)
                .then(dores => {
                    if (this._servicetoken === false) {
                        // TODO: Failed to get the service token
                        reject('Sin Token');
                    }

                    that._serviceuser = username;
                    that._servicekey  = accesskey;

                    const payload = new FormData();
                    payload.append('operation', 'login');
                    payload.append('username', username);
                    payload.append('accessKey', md5(that._servicetoken + accesskey));

                    that.http.post(that._serviceurl, payload)
                        .toPromise()
                        .then(reslogin => {
                            const res: Response = <Response>reslogin;
                            if (that.hasError(res, 'doLogin') === false) {
                                const out: LoginResponse = res.result;
                                that._sessionid  = out.sessionName;
                                that._userid = out.userId;
                                this.setVtigerLoginData();
                                if (that._isLoggin) {
                                    resolve({
                                        apiKey: accesskey,
                                        userId: this._userid,
                                        userName: username
                                    });
                                } else {
                                    resolve(null);
                                }

                            } else {
                                reject(that._lasterror);
                            }
                            // that.__performCallback(callback, resflag);
                        })
                        .catch(error => {
                            reject(error);
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Do LogOut Operation
     */
    /*doLogout (callback?: any) {
      const that = this;
      return new Promise((resolve, reject) => {
        const payload = new FormData();
        payload.append('operation', 'logout');
        payload.append('sessionName', that._sessionid);

        that.http.post(that._serviceurl, payload)
          .toPromise()
          .then(reslogin => {
            const res: Response = reslogin;
            if (that.hasError(res, 'doLogin') === false) {
              that._sessionid  = false;
              that._userid = false;
              that._isLoggin = false;
              resolve(that._isLoggin);
            } else {
              reject(that._lasterror);
            }
            // that.__performCallback(callback, resflag);
          })
          .catch(error => {
            reject(error);
          });
      });
    }*/

    /**
     * Do Query Operation.
     */
    doQuery (query: string, callback?: any): Promise<any> {
        const that = this;
        return new Promise((resolve, reject) => {
            that.__checkLogin();
            // TODO: Append ; if not found
            if (query.indexOf(';') === -1) {
                query += ';';
            }
            const getDataUrl: string = '?operation=query&sessionName=' + that._sessionid + '&query=' + query;
            that.http.get(that._serviceurl + getDataUrl)
                .toPromise()
                .then(resquery => {
                    const res: Response = <Response>resquery;
                    if (that.hasError(res, 'doQuery') === false) {
                        resolve(res['result']);
                    } else {
                        reject(that._lasterror);
                    }
                    // that.__performCallback(callback, result);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * List types (modules) available.
     */
    doListTypes (callback?: any): Promise<any> {
        const that = this;
        return new Promise((resolve, reject) => {
            that.__checkLogin();
            const getDataUrl = '?operation=listtypes&sessionName=' + that._sessionid;
            that.http.get(that._serviceurl + getDataUrl)
                .toPromise()
                .then(resp => {
                    const res: Response = <Response>resp;
                    let returnvalue: any = false;
                    if (that.hasError(res, 'doListTypes') === false) {
                        const out: ListTypeResponse = res.result;
                        const modulenames = out.types;
                        returnvalue = { };
                        modulenames.forEach(value => {
                            returnvalue[value] = {
                                'name'     : value
                            };
                        });
                        resolve(returnvalue);
                    } else {
                        reject(that._lasterror);
                    }
                    // that.__performCallback(callback, returnvalue);
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

    /**
     * Do Describe Operation
     */
    doDescribe (module: string, callback?: any): Promise<any> {
        const that = this;
        return new Promise((resolve, reject) => {
            that.__checkLogin();
            const getDataUrl = '?operation=describe&sessionName=' + that._sessionid + '&elementType=' + module;
            that.http.get(that._serviceurl + getDataUrl)
                .toPromise()
                .then(resp => {
                    const res: Response = <Response>resp;
                    if (!that.hasError(res, 'doDescribe')) {
                        resolve(res.result);
                    } else {
                        reject(that._lasterror);
                    }
                    // that.__performCallback(callback, result);
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

    /**
     * Retrieve details of record
     */
    doRetrieve (record: string, callback?: any): Promise<any> {
        const that = this;
        return new Promise((resolve, reject) => {
            that.__checkLogin();
            const getDataUrl = '?operation=retrieve&sessionName=' + that._sessionid + '&id=' + record;
            that.http.get(that._serviceurl + getDataUrl)
                .toPromise()
                .then(resp => {
                    const res: Response = <Response>resp;
                    if (!that.hasError(res, 'doRetrieve')) {
                        resolve(res['result']);
                    } else {
                        reject(that._lasterror);
                    }
                    // that.__performCallback(callback, result);
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

    /**
     * Do Create Operation
     */
    doCreate (module: string, valuemap: any, callback?: any): Promise<any> {
        const that = this;
        return new Promise((resolve, reject) => {
            that.__checkLogin();
            // Assign record to logged in user if not specified
            if (valuemap['assigned_user_id'] === null) {
                valuemap['assigned_user_id'] = that._userid;
            }

            const payload = new FormData();
            payload.append('operation', 'create');
            payload.append('sessionName', that._sessionid);
            payload.append('elementType', module);
            payload.append('element', VtigerServiceService.toJSONString(valuemap));

            that.http.post(that._serviceurl, payload)
                .toPromise()
                .then(resp => {
                    const res: Response = <Response>resp;
                    if (!that.hasError(res, 'doCreate')) {
                        resolve(res.result);
                    } else {
                        reject(that._lasterror);
                    }
                    // that.__performCallback(callback, result);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Invoke custom operation
     */
    doInvoke (method: string, params: any, type: any, callback?: any): Promise<any> {
        const that = this;
        return new Promise((resolve, reject) => {
            that.__checkLogin();

            if (typeof(params) === 'undefined') {
                params = {};
            }

            // if(typeof(type) !== 'undefined') const reqtype = type.toUpperCase();

            const sendata = {
                'operation' : method,
                'sessionName' : that._sessionid,
            };

            const payload = new FormData();
            payload.append('operation', method);
            payload.append('sessionName', that._sessionid);

            for (const key in params) {
                /*if (typeof(sendata[key]) === 'undefined') {
                     sendata[key] = params[key];
                }*/
                if (params.hasOwnProperty(key) && !sendata.hasOwnProperty(key)) {
                    payload.append(key, params[key]);
                }
            }

            that.http.post(that._serviceurl, payload)
                .toPromise()
                .then(resp => {
                    const res: Response = <Response>resp;
                    if (!that.hasError(res, 'doInvoke')) {
                        resolve(res['result']);
                    } else {
                        reject(that._lasterror);
                    }
                    // that.__performCallback(callback, result);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    setVtigerLoginData (): void {
        const data = {
            sessId: this._sessionid,
            userID: this._userid
        };
        Utilities.session.setSession('vtigerLoginData', data);
        Utilities.logins.setLoggedin();
        this._isLoggin = true;
    }

    getVtigerLoginData (): void {
        this._isLoggin = false;
        if (Utilities.logins.isLoggedin()) {
            const data = Utilities.session.getSession('vtigerLoginData');
            if (data !== null) {
                this._sessionid = data.ssessId;
                this._userid = data.userId;
                this._isLoggin = true;
            }
        }
    }
}
