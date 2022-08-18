import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-finalizar-firma',
  templateUrl: './finalizar-firma.component.html',
  styleUrls: ['./finalizar-firma.component.scss']
})
export class FinalizarFirmaComponent implements OnInit {

  titulo: string;
  cuerpo: string;
  correo: string;
  captura: {}
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(private router: Router, private activeroute: ActivatedRoute) { }

  ngOnInit() {
    this.captura=JSON.parse(localStorage.getItem('final'))
    this.titulo = this.captura['title']
    this.cuerpo = this.captura['body']
    this.correo = this.captura['value']
  }

  finalizar() {
    this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
  }

}
