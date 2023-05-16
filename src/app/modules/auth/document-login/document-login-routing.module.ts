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
import { FirmaInternaComponent } from './firma-interna/firma-interna.component';
import { DocumentosFirmarComponent } from './documentos-firmar/documentos-firmar.component';
import { ValidarOtpFirmaComponent } from './validar-otp-firma/validar-otp-firma.component';
import { GenerarFirmaComponent } from './generar-firma/generar-firma.component';
import { FinalizarFirmaComponent } from './finalizar-firma/finalizar-firma.component';

const routes: Routes = [
  {
    path     : ':num/:uni/:tipo',
    component: DocumentLoginComponent,
  },
  {
    path     : ':num/:uni/:tipo/user/:doc',
    component: DataUserComponent
  },
  {
    path     : ':num/:uni/:tipo/replay',
    component: ReplayComponent
  },
  {
    path     : 'page404',
    component: Pages404Component,
  },
  {
    path     : ':num/:uni/:tipo/pregunta',
    component: PreguntaComponent
  },
  {
    path     : ':num/:uni/:tipo/finalizado',
    component: FinalizadoComponent
  },
  {
    path     : ':num/:uni/:tipo/generarOTP',
    component: GeneraOTPComponent
  },
  {
    path     : ':num/:uni/:tipo/aprobado',
    component: AprobadoComponent
  },
  {
    path     : ':num/:uni/:tipo/no-aprobado',
    component: NoAprobadoComponent
  },
  {
    path     : ':num/:uni/:tipo/interna',
    component: FirmaInternaComponent
  },
  {
    path     : ':num/:uni/:tipo/docu-firma',
    component: DocumentosFirmarComponent
  },
  {
    path     : ':num/:uni/:tipo/otp-firma',
    component: ValidarOtpFirmaComponent
  },
  {
    path     : ':num/:uni/:tipo/generar-firma',
    component: GenerarFirmaComponent
  },
  {
    path     : ':num/:uni/:tipo/finalizar-firma',
    component: FinalizarFirmaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentLoginRoutingModule { }
