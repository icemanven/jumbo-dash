import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {Router} from '@angular/router';
import {VtigerServiceService} from '@service/vtiger.Service';
import {JumboBackEndService} from '@service/jumbo-back-end.service';
import {FuseProgressBarService} from '@fuse/components/progress-bar/progress-bar.service';
import {CrmConst} from '@configs/constantes';
import {Usuario} from '@configs/interfaces';
import {Utilities} from '@utilities/utilities';

@Component({
    selector   : 'vt-login',
    templateUrl: './vt-login.component.html',
    styleUrls  : ['./vt-login.component.scss'],
    animations : fuseAnimations
})
export class VtLoginComponent implements OnInit
{
    loginForm: FormGroup;
    loginError: any;
    logo: string;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param vtService servicos web para conexion con vtigercrm
     * @param _fuseProgressBarService
     * @param route
     * @param backEndService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private vtService: VtigerServiceService,
        private _fuseProgressBarService: FuseProgressBarService,
        private route: Router,
        private backEndService: JumboBackEndService
    )
    {
        // Configure the layout
        this.loginError = null;
        this.logo = CrmConst.logoDir;
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            user   : ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    setLogin (): void {
        this._fuseProgressBarService.show();
        const user = this.loginForm.value;
        // user.password = LogicaService.Md5(user.password);
        console.log(user);
        this.vtService.doDashLogin(user.user, user.password)
            .then(res => {
                console.log(res);
                if (res !== null) {
                    this.backEndService.getUserByUsername(user.user)
                        .then(beUser => {
                            if (<any>beUser === false) {
                                const newUser: Usuario = <Usuario>{
                                    username: res.userName,
                                    apikey: res.apiKey,
                                    crmid: res.userId,
                                    userInfo: Utilities.currentUser.getCurrentUser(),
                                    sistema: {
                                        fechaCreacion: new Date(),
                                        fechaModificacion: new Date()
                                    }
                                };
                                this.backEndService.saveNewUser(newUser)
                                    .then(usuario => {
                                        this.setDashUser(usuario);
                                    })
                                    .catch(error => {
                                        Utilities.logins.logOff();
                                        this.onCatch(error);
                                    });
                            } else {
                                this.setDashUser(beUser);
                            }
                        })
                        .catch(error => {
                            Utilities.logins.logOff();
                            this.onCatch(error);
                        });

                } else {
                    Utilities.logins.logOff();
                    this.onCatch('Error al Iniciar Sesion');
                }

            })
            .catch(error => {
                this.onCatch(error);
            });
    }

    onCatch(error): void {
        this.loginError = error;
        this._fuseProgressBarService.hide();
    }

    setDashUser(usuario): void {
        const crUser = Utilities.currentUser.getCurrentUser();
        crUser['DashUser'] = usuario;
        Utilities.currentUser.setCurrentUser(crUser);
        this._fuseProgressBarService.hide();
        this.route.navigate(['/']);
    }
}
