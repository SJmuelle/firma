import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  idRUL: string =  this.activaroute.snapshot.paramMap.get('doc');
  constructor(
    private _documentLoginService: DocumentLoginService,
    private router: Router,
    private activaroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    console.log(this.datosUsuario)
    if (this.idRUL!=this.datosUsuario.identificacion) {
      this.router.navigate(['documentLogin']);
    }
  }

  seguir() {
    let evidente = this.datosUsuario.aplicaEvidente;

    if (evidente=='Si') {
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
    } else {
      let data={
        "unidadNegocio": 31,
        "numeroSolicitud": 125735
      }
      this._documentLoginService.archivosThomas(data).subscribe(resp => {
        console.log(resp)
        if(resp.data.status==400){
          localStorage.setItem('ERROR', resp.data.mensaje);
          this.router.navigate(['documentLogin/replay']);
          return;
        }else{
          this.router.navigate(['documentLogin/finalizado']);
        }
      })
    }
  }

}
