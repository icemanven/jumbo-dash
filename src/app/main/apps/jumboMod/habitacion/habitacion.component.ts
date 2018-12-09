import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import {MatSnackBar} from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import {HabitacionConst, HabitacionModel} from './habitacion.model';
import {HabitacionService} from './habitacion.service';
import {Router} from '@angular/router';
import {Utilities} from '@utilities/utilities';


@Component({
    selector     : 'jum-habitacion',
    templateUrl  : './habitacion.component.html',
    styleUrls    : ['./habitacion.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class HabitacionComponent implements OnInit, OnDestroy
{
    entidad: HabitacionModel;
    pageType: string;
    entidadForm: FormGroup;
    entidadConst: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EcommerceProductService} entidadService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param router
     */
    constructor(
        private entidadService: HabitacionService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private router: Router
    )
    {
        this.entidadConst = HabitacionConst;
        // Set the default
        this.entidad = new HabitacionModel();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to update entidad on changes
        this.entidadService.onEntidadChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(entidad => {
                if ( entidad )
                {
                    this.entidad = new HabitacionModel(entidad);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.entidad = new HabitacionModel();
                }

                this.entidadForm = this.createEntidadForm();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create entidad form
     *
     * @returns {FormGroup}
     */
    createEntidadForm(): FormGroup
    {
        return this._formBuilder.group({
            _id             : [this.entidad._id],
            nombre          : [this.entidad.nombre, Validators.required],
            descripcion     : [this.entidad.descripcion],
            capacidad       : [this.entidad.capacidad],
            adulto          : [this.entidad.adulto],
            ninos           : [this.entidad.ninos],
            inf             : [this.entidad.inf],
            tipoCama        : [this.entidad.tipoCama],
            sistema         : [this.entidad.sistema],
        });
    }

    /**
     * Save entidad
     */
    saveEntidad(): void
    {
        const data = this.entidadForm.getRawValue();

        this.entidadService.saveEntidad(Utilities.systems.setEntitySistema(data))
            .then(() => {

                // Trigger the subscription with new data
                this.entidadService.onEntidadChanged.next(data);

                // Show the success message
                this._matSnackBar.open(`${this.entidadConst.name} Guardado`, 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    /**
     * Add entidad
     */
    addEntidad(): void
    {
        const data = this.entidadForm.getRawValue();

        this.entidadService.addEntidad(Utilities.systems.setEntitySistema(data))
            .then((entidad) => {

                // Trigger the subscription with new data
                this.entidadService.onEntidadChanged.next(entidad);

                // Show the success message
                this._matSnackBar.open(`${this.entidadConst.name} Agregado`, 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this._location.go(`${this.entidadConst.urlEntidad}/${ this.entidad._id}`);
            });
    }

    removeEntidad(): void
    {
        const data = this.entidadForm.getRawValue();

        this.entidadService.removeEntidad(data)
            .then(() => {

                // Show the success message
                this._matSnackBar.open(`${this.entidadConst.name} Borrado`, 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // this._location.go(`${this.entidadConst.urlEntidades}`);
                this.router.navigate([`${this.entidadConst.urlEntidades}`]);
            });
    }
}
