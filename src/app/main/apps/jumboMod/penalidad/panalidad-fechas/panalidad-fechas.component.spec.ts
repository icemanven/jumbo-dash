import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanalidadFechasComponent } from './panalidad-fechas.component';

describe('PanalidadFechasComponent', () => {
  let component: PanalidadFechasComponent;
  let fixture: ComponentFixture<PanalidadFechasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanalidadFechasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanalidadFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
