/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NoAprobadoComponent } from './no-aprobado.component';

describe('NoAprobadoComponent', () => {
  let component: NoAprobadoComponent;
  let fixture: ComponentFixture<NoAprobadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoAprobadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAprobadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
