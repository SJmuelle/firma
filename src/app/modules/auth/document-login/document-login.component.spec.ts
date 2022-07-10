import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentLoginComponent } from './document-login.component';

describe('DocumentLoginComponent', () => {
  let component: DocumentLoginComponent;
  let fixture: ComponentFixture<DocumentLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
