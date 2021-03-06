import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataUserComponent } from './data-user/data-user.component';
import { DocumentLoginComponent } from './document-login.component';
import { FinalizadoComponent } from './finalizado/finalizado.component';
import { GeneraOTPComponent } from './genera-otp/genera-otp.component';
import { Pages404Component } from './pages404/pages404.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { ReplayComponent } from './replay/replay.component';

const routes: Routes = [
  {
    path     : '',
    component: DocumentLoginComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentLoginRoutingModule { }
