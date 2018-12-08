import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import {CrmConst} from '@configs/constantes';
import {Utilities} from '@utilities/utilities';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService implements CanActivate {

    constructor(private router: Router) {}

    canActivate(): boolean {
    if (Utilities.logins.isLoggedin()) {
        return true;
    } else {
        this.router.navigate([CrmConst.loginDir]);
        return false;
    }
}
}
