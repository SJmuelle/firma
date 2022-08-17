import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentLoginRoutingModule } from './document-login-routing.module';
import { DocumentLoginComponent } from './document-login.component';
import { SharedModule } from 'app/shared/shared.module';
import { DataUserComponent } from './data-user/data-user.component';
import { ReplayComponent } from './replay/replay.component';
import { Pages404Component } from './pages404/pages404.component';
import { FinalizadoComponent } from './finalizado/finalizado.component';
import { GeneraOTPComponent } from './genera-otp/genera-otp.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { NoAprobadoComponent } from './no-aprobado/no-aprobado.component';
import { AprobadoComponent } from './aprobado/aprobado.component';
import { CantPreguntasComponent } from './cant-preguntas/cant-preguntas.component';
import { FirmaInternaComponent } from './firma-interna/firma-interna.component';
import { ClausulaComponent } from './firma-interna/clausula/clausula.component';
import { DocumentosFirmarComponent } from './documentos-firmar/documentos-firmar.component';
import { ValidarOtpFirmaComponent } from './validar-otp-firma/validar-otp-firma.component';
import { GenerarFirmaComponent } from './generar-firma/generar-firma.component';


@NgModule({
  declarations: [
    DocumentLoginComponent,
    DataUserComponent,
    ReplayComponent,
    Pages404Component,
    FinalizadoComponent,
    GeneraOTPComponent,
    PreguntaComponent,
    NoAprobadoComponent,
    AprobadoComponent,
    CantPreguntasComponent,
    FirmaInternaComponent,
    ClausulaComponent,
    DocumentosFirmarComponent,
    ValidarOtpFirmaComponent,
    GenerarFirmaComponent
  ],
  imports: [
    CommonModule,
    DocumentLoginRoutingModule,
    SharedModule
  ]
})
export class DocumentLoginModule { }
