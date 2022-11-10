import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirmaInternaService } from 'app/core/service/firma-interna.service';
import { GuardianService } from 'app/core/service/guardian.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-finalizar-firma',
  templateUrl: './finalizar-firma.component.html',
  styleUrls: ['./finalizar-firma.component.scss']
})
export class FinalizarFirmaComponent implements OnInit {

  correo: string;
  documentos: any = [];
  filePagare: any = [];
  objPagare: {}
  captura: {}
  pagare: {}
  datosUsuario: any;
  listadoArchivos: any = [];
  extension: string = 'pdf';
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')
  concedido: any;
  subscripcion: Subscription;
  acceso: boolean;

  constructor(
    private router: Router, 
    private activeroute: ActivatedRoute,
    private guardia: GuardianService,
    private firmainterna: FirmaInternaService) { }

  ngOnInit() {
    this.subscripcion = this.guardia.conceder.subscribe(({ acceso }) => {
      this.concedido = acceso;
    })
    // if (this.concedido!=true) {
    //   this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
    // }else{
    //   this.guardia.conceder.next({acceso: this.acceso=false})
    //   this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    //   this.captura=JSON.parse(localStorage.getItem('final'))
    //   this.pagare=JSON.parse(localStorage.getItem('pagare'))
    //   this.correo = this.captura['value']
    //   this.documentos = this.captura['base64']
    //   if (this.uni != '30') {
    //     this.objPagare = {
    //       "base64":this.pagare,
    //       "nombre":"Pagare Deceval"
    //     }
    //     this.documentos.push(this.objPagare)
    //   }
    // }
    this.guardia.conceder.next({acceso: this.acceso=false})
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
      this.captura=JSON.parse(localStorage.getItem('final'))
      this.pagare=JSON.parse(localStorage.getItem('pagare'))
      this.correo = this.captura['value']
      this.documentos = this.captura['base64']
      if (this.uni != '30') {
        this.objPagare = {
          "base64":this.pagare,
          "nombre":"Pagare Deceval"
        }
        this.documentos.push(this.objPagare)
      }
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  descargar(nombre, base64) {
    const archivo = base64.split(',');
    const extension = 'pdf'
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = `data:application/${extension};base64,${archivo}`;
    link.target = '_self';
    link.download = nombre
    link.click();
  }

}
