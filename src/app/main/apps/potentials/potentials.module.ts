import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';


import {PotentialsComponent} from './potentials.component';
import {PotentialsService} from './potentials.service';
import {ContactsContactListComponent} from './contact-list/contact-list.component';
import {ContactsSelectedBarComponent} from './selected-bar/selected-bar.component';
import {ContactsMainSidebarComponent} from './sidebars/main/main.component';
import {ContactsContactFormDialogComponent} from './contact-form/contact-form.component';

const routes: Routes = [
    {
        path     : '**',
        component: PotentialsComponent,
        resolve  : {
            contacts: PotentialsService
        }
    }
];

@NgModule({
    declarations   : [
        PotentialsComponent,
        ContactsContactListComponent,
        ContactsSelectedBarComponent,
        ContactsMainSidebarComponent,
        ContactsContactFormDialogComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers      : [
        PotentialsService
    ],
    entryComponents: [
        ContactsContactFormDialogComponent
    ]
})
export class PotentialsModule
{
}
