import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentLoginComponent } from './document-login.component';

const routes: Routes = [
  {
    path     : '',
    component: DocumentLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentLoginRoutingModule { }
