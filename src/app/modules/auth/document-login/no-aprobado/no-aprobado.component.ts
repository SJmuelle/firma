import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-no-aprobado',
  templateUrl: './no-aprobado.component.html',
  styleUrls: ['./no-aprobado.component.scss']
})
export class NoAprobadoComponent implements OnInit {

  mensaje: string;
  captura: {}
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(private router: Router, private activeroute: ActivatedRoute) { }

  ngOnInit() {
    this.captura=JSON.parse(localStorage.getItem('error'))
    this.mensaje = this.captura['mensaje']
  }

  seguir() {
    this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
  }

}
