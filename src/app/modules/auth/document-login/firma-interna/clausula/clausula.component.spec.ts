/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClausulaComponent } from './clausula.component';

describe('ClausulaComponent', () => {
  let component: ClausulaComponent;
  let fixture: ComponentFixture<ClausulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClausulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClausulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
