import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirmaInternaService } from 'app/core/service/firma-interna.service';

@Component({
  selector: 'app-finalizar-firma',
  templateUrl: './finalizar-firma.component.html',
  styleUrls: ['./finalizar-firma.component.scss']
})
export class FinalizarFirmaComponent implements OnInit {

  titulo: string;
  cuerpo: string;
  correo: string;
  documentos: any = [];
  captura: {}
  listadoArchivos: any = [];
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(
    private router: Router, 
    private activeroute: ActivatedRoute,
    private firmainterna: FirmaInternaService) { }

  ngOnInit() {
    this.captura=JSON.parse(localStorage.getItem('final'))
    this.titulo = this.captura['title']
    this.cuerpo = this.captura['body']
    this.correo = this.captura['value']
    this.documentos = this.captura['base64']

    console.log(this.documentos)
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

  finalizar() {
    this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
  }

}
