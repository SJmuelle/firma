import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aprobado',
  templateUrl: './aprobado.component.html',
  styleUrls: ['./aprobado.component.scss']
})
export class AprobadoComponent implements OnInit {

  mensaje: string;
  captura: {}

  constructor() { }

  ngOnInit() {
    this.captura=JSON.parse(localStorage.getItem('aprob'))
    this.mensaje = this.captura['mensaje']
  }

}
