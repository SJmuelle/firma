import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirmaInternaService } from 'app/core/service/firma-interna.service';
import { GuardianService } from 'app/core/service/guardian.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-documentos-firmar',
  templateUrl: './documentos-firmar.component.html',
  styleUrls: ['./documentos-firmar.component.scss']
})
export class DocumentosFirmarComponent implements OnInit {

  showAlert: boolean = false;
  listadoArchivos: any = [];
  listadoFalso: any = [];
  fileFalso: any = {};
  listaBreve: any = [1 , 2, 3]
  datoTel: any;
  Btndisabled: boolean;
  cargando: boolean;
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')
  concedido: any;
  subscripcion: Subscription;
  acceso: boolean;
  iden: any;

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private guardia: GuardianService,
    private firmainterna: FirmaInternaService
  ) { }

  ngOnInit() {
    // this.listadoFalso = [
    //   this.fileFalso = {
    //     "nombre":"hola"
    //   },
    //   {
    //     "nombre":"como"
    //   },
    //   {
    //     "nombre":"estas"
    //   },
    //   {
    //     "nombre":"bien"
    //   }
    // ]
    console.log(this.listadoFalso)
    this.subscripcion = this.guardia.conceder.subscribe(({ acceso }) => {
      this.concedido = acceso;
    })
    // if (this.concedido!=true) {
    //   this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
    // }
    this.iden = JSON.parse(localStorage.getItem('datosUsuario'));
    console.log(this.iden.identificacion)
    this.guardia.conceder.next({acceso: this.acceso=false})
    this.cargando = true;
    let data = {
      "unidadNegocio": parseInt(this.uni),
      "tipoDoc":1,
      "numeroSolicitud":parseInt(this.soli),
      "tipoTercero":"T",
      "identificacion":parseInt(this.iden.identificacion)
    }
    this.firmainterna.documentosFirmar(data).subscribe(resp => {
      if (resp.status == 200) {
        this.cargando = false;
        console.log(resp.data)
        console.log(resp.data[0].informacion_archivo.nombreArchivo)
        this.listadoArchivos = resp.data
      }else{
        this.listadoArchivos = [];
      }
    })
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  conceder(){
    this.acceso = true;
    this.guardia.conceder.next({acceso: this.acceso})
  }

  descargar(item, base64) {
    const archivo = base64.split(',');
    const extension = 'pdf'
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = `data:application/${extension};base64,${archivo}`;
    link.target = '_self';
    link.download = item.nombreArchivo
    link.click();
  }

  seguir() {
    this.Btndisabled = true;
    let data = {
      "numeroSolicitud": parseInt(this.soli),
      "tipo":"T",
      "identificacion":parseInt(this.iden.identificacion)
    }

    this.firmainterna.solicitarGenerar(data).subscribe(resp => {
      if (resp.status == 200) {
        this.Btndisabled = false;
        const telefono = JSON.stringify(resp.data.value);
        localStorage.setItem('telefono', telefono);
        this.conceder();
        this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/' + 'otp-firma']);
      }
    }, err => {
      this.Btndisabled = false;
    })
  }

}
