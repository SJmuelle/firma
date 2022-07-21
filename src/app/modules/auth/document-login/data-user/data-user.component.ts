import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentLoginService } from 'app/core/service/document-login.service';
import { UtilityEvidenteService } from 'app/core/service/utility-evidente.service';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.scss']
})
export class DataUserComponent implements OnInit {
  datosUsuario: any;
  Btndisabled: boolean = false;
  constructor(
    private _documentLoginService: DocumentLoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    debugger
    this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
  }

  seguir() {
    
    let data={
      "identificacion":  this.datosUsuario.identificacion,
      "unidadNegocio": 31
    }
    this._documentLoginService.datosUsuarioEvidente(data).subscribe(resp => {
      console.log(resp)
      if(resp.data.status==400){
        localStorage.setItem('ERROR', resp.data.mensaje);
        this.router.navigate(['documentLogin/replay']);
        return;
      }
      this.router.navigate(['documentLogin/generarOTP']);
    })

  }

}
