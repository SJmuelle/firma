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
  listaBreve: any = [1 , 2, 3]
  datoTel: any;
  Btndisabled: boolean;
  cargando: boolean;
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')
  concedido: any;
  subscripcion: Subscription;
  acceso: boolean;

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private guardia: GuardianService,
    private firmainterna: FirmaInternaService
  ) { }

  ngOnInit() {
    this.subscripcion = this.guardia.concedeDocu.subscribe(({ accesoDocu }) => {
      this.concedido = accesoDocu;
    })
    // if (this.concedido!=true) {
    //   this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
    // }
    this.cargando = true;
    let data = {
      "unidadNegocio": parseInt(this.uni),
      "tipoDoc":1,
      "numeroSolicitud":parseInt(this.soli),
      "tipoTercero":"T"
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

  concederAccesoOtpFirma(){
    this.acceso = true;
    this.guardia.concedeOtpFirma.next({accesoOtpFirma: this.acceso})
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
      "tipo":"T"
    }

    this.firmainterna.solicitarGenerar(data).subscribe(resp => {
      if (resp.status == 200) {
        this.Btndisabled = false;
        const telefono = JSON.stringify(resp.data.value);
        localStorage.setItem('telefono', telefono);
        this.concederAccesoOtpFirma();
        this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/' + 'otp-firma']);
      }
    }, err => {
      this.Btndisabled = false;
    })
  }

}
