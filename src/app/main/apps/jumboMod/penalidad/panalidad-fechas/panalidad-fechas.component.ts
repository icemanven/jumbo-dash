import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {FechasPenalidad} from '@configs/interfaces';

@Component({
  selector: 'app-panalidad-fechas',
  templateUrl: './panalidad-fechas.component.html',
  styleUrls: ['./panalidad-fechas.component.scss']
})
export class PanalidadFechasComponent implements OnInit {
    @Input()
    data: FechasPenalidad[];
    dataSource = new BehaviorSubject<AbstractControl[]>([]);
    displayColumns = ['fechasini', 'fechaFin'];
    rows: FormArray = this.fb.array([]);
    form: FormGroup = this.fb.group({ 'dates': this.rows });

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.data.forEach((d: FechasPenalidad) => this.addRow(d, false));
        this.updateView();
    }

    emptyTable(): void {
        while (this.rows.length !== 0) {
            this.rows.removeAt(0);
        }
    }

    addRow(d?: FechasPenalidad, noUpdate?: boolean): void {
        const row = this.fb.group({
            'from'   : [d && d.fechasini ? d.fechasini : null, []],
            'to'     : [d && d.fechaFin   ? d.fechaFin   : null, []]
        });
        this.rows.push(row);
        if (!noUpdate) { this.updateView(); }
    }

    updateView(): void {
        this.dataSource.next(this.rows.controls);
    }
}
