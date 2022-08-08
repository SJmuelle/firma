import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-aprobado',
  templateUrl: './no-aprobado.component.html',
  styleUrls: ['./no-aprobado.component.scss']
})
export class NoAprobadoComponent implements OnInit {

  mensaje: string;
  captura: {}

  constructor(private router: Router) { }

  ngOnInit() {
    this.captura=JSON.parse(localStorage.getItem('error'))
    this.mensaje = this.captura['mensaje']
  }

  seguir() {
    this.router.navigate(['documentLogin']);
  }

}
