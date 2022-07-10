import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentLoginRoutingModule } from './document-login-routing.module';
import { DocumentLoginComponent } from './document-login.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    DocumentLoginComponent
  ],
  imports: [
    CommonModule,
    DocumentLoginRoutingModule,
    SharedModule
  ]
})
export class DocumentLoginModule { }
