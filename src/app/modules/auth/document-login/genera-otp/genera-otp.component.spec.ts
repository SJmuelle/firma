import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraOTPComponent } from './genera-otp.component';

describe('GeneraOTPComponent', () => {
  let component: GeneraOTPComponent;
  let fixture: ComponentFixture<GeneraOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneraOTPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneraOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
