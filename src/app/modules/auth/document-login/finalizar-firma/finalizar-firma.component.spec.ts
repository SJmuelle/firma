/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FinalizarFirmaComponent } from './finalizar-firma.component';

describe('FinalizarFirmaComponent', () => {
  let component: FinalizarFirmaComponent;
  let fixture: ComponentFixture<FinalizarFirmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarFirmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarFirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
