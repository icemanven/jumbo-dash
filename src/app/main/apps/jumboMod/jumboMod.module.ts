import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCard, MatCheckbox, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule,
    MatTableModule, MatTabsModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import {ServicioComponent} from './servicio/servicio.component';
import {ServicioService} from './servicio/servicio.service';
import {ServiciosComponent} from './servicios/servicios.component';
import {ServiciosService} from './servicios/servicios.service';
import {EcommerceOrderComponent} from './order/order.component';
import {EcommerceOrdersComponent} from './orders/orders.component';
import {EcommerceProductComponent} from './product/product.component';
import {EcommerceProductsComponent} from './products/products.component';
import {PenalidadComponent} from './penalidad/penalidad.component';
import {PenalidadService} from './penalidad/penalidad.service';
import { PanalidadFechasComponent } from './penalidad/panalidad-fechas/panalidad-fechas.component';
import {DocsComponent} from './docs/docs.component';
import {DocslistService} from './docslist/docslist.service';
import {DocsService} from './docs/docs.service';
import {DocslistComponent} from './docslist/docslist.component';
import {CoreModule} from '@core/core.module';
import {PenalidadesComponent} from './penalidades/penalidades.component';


const routes: Routes = [

    {
        path     : 'servicios',
        component: ServiciosComponent,
        resolve  : {
            data: ServiciosService
        }
    },
    {
        path     : 'servicio',
        component: ServicioComponent,
        resolve  : {
            data: ServicioService
        }
    },
    {
        path     : 'servicio/:id',
        component: ServicioComponent,
        resolve  : {
            data: ServicioService
        }
    },
    /*{
        path     : 'penalidades',
        component: PenalidadesComponen,
        resolve  : {
            data: ServiciosService
        }
    },*/
    {
        path     : 'penalidad',
        component: PenalidadComponent,
        resolve  : {
            data: PenalidadService
        }
    },
    {
        path     : 'penalidad/:id',
        component: PenalidadComponent,
        resolve  : {
            data: PenalidadService
        }
    },
    {
        path: 'docslist/:docType',
        component: DocslistComponent,
        resolve: {
            data: DocslistService
        }
    },
    {
        path: 'docs/:docType',
        component: DocsComponent,
        resolve: {
            data: DocsService
        }
    },
    {
        path: 'docs/:docType/:id',
        component: DocsComponent,
        resolve: {
            data: DocsService
        }
    },
];

@NgModule({
    declarations: [
        ServicioComponent,
        ServiciosComponent,
        PenalidadComponent,
        EcommerceOrderComponent,
        EcommerceOrdersComponent,
        EcommerceProductComponent,
        EcommerceProductsComponent,
        PanalidadFechasComponent,
        DocsComponent,
        DocslistComponent,
        PenalidadesComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),
        CoreModule,
        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,
    ],
    providers   : [
        ServicioService,
        ServiciosService,
        PenalidadService,
        DocsService,
        DocslistService
    ]
})
export class JumboModModule
{
}
