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
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(private router: Router, private activeroute: ActivatedRoute) { }

  ngOnInit() {
    this.titulo = localStorage.getItem('titulo')
    this.cuerpo = localStorage.getItem('cuerpo')
    this.correo = localStorage.getItem('correo')
  }

}
