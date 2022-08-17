import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataUserComponent } from './data-user/data-user.component';
import { DocumentLoginComponent } from './document-login.component';
import { FinalizadoComponent } from './finalizado/finalizado.component';
import { GeneraOTPComponent } from './genera-otp/genera-otp.component';
import { Pages404Component } from './pages404/pages404.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { ReplayComponent } from './replay/replay.component';
import { NoAprobadoComponent } from './no-aprobado/no-aprobado.component';
import { AprobadoComponent } from './aprobado/aprobado.component';
import { CantPreguntasComponent } from './cant-preguntas/cant-preguntas.component';
import { FirmaInternaComponent } from './firma-interna/firma-interna.component';
import { DocumentosFirmarComponent } from './documentos-firmar/documentos-firmar.component';
import { ValidarOtpFirmaComponent } from './validar-otp-firma/validar-otp-firma.component';
import { GenerarFirmaComponent } from './generar-firma/generar-firma.component';

const routes: Routes = [
  {
    path     : '',
    component: DocumentLoginComponent,
  },
  {
    path     : 'user/:doc',
    component: DataUserComponent
  },
  {
    path     : 'replay',
    component: ReplayComponent
  },
  {
    path     : 'page404',
    component: Pages404Component
  },
  {
    path     : 'pregunta',
    component: PreguntaComponent
  },
  {
    path     : 'finalizado',
    component: FinalizadoComponent
  },
  {
    path     : 'generarOTP',
    component: GeneraOTPComponent
  },
  {
    path     : 'aprobado',
    component: AprobadoComponent
  },
  {
    path     : 'no-aprobado',
    component: NoAprobadoComponent
  },
  {
    path     : 'ejemplo',
    component: CantPreguntasComponent
  },
  {
    path     : 'interna',
    component: FirmaInternaComponent
  },
  {
    path     : 'docu-firma',
    component: DocumentosFirmarComponent
  },
  {
    path     : 'otp-firma',
    component: ValidarOtpFirmaComponent
  },
  {
    path     : 'generar-firma',
    component: GenerarFirmaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentLoginRoutingModule { }
