import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {Docs} from '@configs/interfaces';
import {BackEndConst} from '@configs/constantes';

@Injectable()
export class DocsService implements Resolve<any>
{
    routeParams: any;
    entidad: Docs;
    onEntidadChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onEntidadChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getEntidad()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get entidad
     *
     * @returns {Promise<any>}
     */
    getEntidad(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( !this.routeParams.id ) // === 'new'
            {
                this.onEntidadChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get(`${BackEndConst.backEndUrl}${BackEndConst.endPoints.docs}/${this.routeParams.docType}/${this.routeParams.id}`)
                    .subscribe((response: any) => {
                        this.entidad = response;
                        this.onEntidadChanged.next(this.entidad);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save entidad
     *
     * @param entidad
     * @returns {Promise<any>}
     */
    saveEntidad(entidad): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${BackEndConst.backEndUrl}${BackEndConst.endPoints.docs}/${this.routeParams.docType}/${entidad._id}`, entidad)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add entidad
     *
     * @param entidad
     * @returns {Promise<any>}
     */
    addEntidad(entidad): Promise<any>
    {
        if (entidad._id === null) {
            delete entidad._id;
        }
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${BackEndConst.backEndUrl}${BackEndConst.endPoints.docs}/${this.routeParams.docType}`, entidad)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Remove entidad
     *
     * @returns {Promise<any>}
     */
    removeEntidad(entidad): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${BackEndConst.backEndUrl}${BackEndConst.endPoints.docs}/${this.routeParams.docType}/${entidad._id}`)
                .subscribe((response: any) => {
                    this.entidad = response;
                    this.onEntidadChanged.next(this.entidad);
                    resolve(response);
                }, reject);
        });
    }
}
