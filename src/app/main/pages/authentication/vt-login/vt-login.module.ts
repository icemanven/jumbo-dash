import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import {VtLoginComponent} from './vt-login.component';


const routes = [
    {
        path     : 'auth/jumbologin',
        component: VtLoginComponent
    }
];

@NgModule({
    declarations: [
        VtLoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ],
})
export class VtLoginModule
{
}
