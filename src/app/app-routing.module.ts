import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AutenticacionService} from './servicios/autenticacion.service';

const appRoutes: Routes = [
    {
        path        : 'apps',
        canActivate: [AutenticacionService],
        loadChildren: './main/apps/apps.module#AppsModule'
    },
    {
        path        : 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    {
        path      : '',
        pathMatch: 'full',
        redirectTo: 'apps/dashboards/analytics'
    },
    {
        path      : '**',
        redirectTo: 'pages/errors/error-404'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
