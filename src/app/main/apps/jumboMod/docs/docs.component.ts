import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DocsModel} from './docs.model';
import {ActivatedRoute} from '@angular/router';
import {Utilities} from '@utilities/utilities';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {
    entidad: DocsModel;
    docType: string;
    entidadForm: FormGroup;
    entidadConst: any;
    date: Date;
    verDocumento: boolean;

    constructor (
        private route: ActivatedRoute
    ) {
        this.date = new Date();
        this.verDocumento = false;
    }

    ngOnInit (): void {
        this.docType = this.route.snapshot.params.docType;
        this.entidadConst = Utilities.documentos.getType(this.docType);
    }

    verDocumentoAxn(): void {
        this.verDocumento = true;
    }
}
