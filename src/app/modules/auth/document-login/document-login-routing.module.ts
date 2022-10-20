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
    path     : ':num/:uni',
    component: DocumentLoginComponent,
  },
  {
    path     : ':num/:uni/user/:doc',
    component: DataUserComponent
  },
  {
    path     : ':num/:uni/replay',
    component: ReplayComponent
  },
  {
    path     : 'page404',
    component: Pages404Component,
  },
  {
    path     : ':num/:uni/pregunta',
    component: PreguntaComponent
  },
  {
    path     : ':num/:uni/finalizado',
    component: FinalizadoComponent
  },
  {
    path     : ':num/:uni/generarOTP',
    component: GeneraOTPComponent
  },
  {
    path     : ':num/:uni/aprobado',
    component: AprobadoComponent
  },
  {
    path     : ':num/:uni/no-aprobado',
    component: NoAprobadoComponent
  },
  {
    path     : ':num/:uni/interna',
    component: FirmaInternaComponent
  },
  {
    path     : ':num/:uni/docu-firma',
    component: DocumentosFirmarComponent
  },
  {
    path     : ':num/:uni/otp-firma',
    component: ValidarOtpFirmaComponent
  },
  {
    path     : ':num/:uni/generar-firma',
    component: GenerarFirmaComponent
  },
  {
    path     : ':num/:uni/finalizar-firma',
    component: FinalizarFirmaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentLoginRoutingModule { }
