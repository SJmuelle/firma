import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardianService } from 'app/core/service/guardian.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aprobado',
  templateUrl: './aprobado.component.html',
  styleUrls: ['./aprobado.component.scss']
})
export class AprobadoComponent implements OnInit {

  mensaje: string;
  captura: {}
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')
  concedido: any;
  subscripcion: Subscription;
  acceso: boolean;

  constructor(private router: Router, private activeroute: ActivatedRoute, private guardia: GuardianService) { }

  ngOnInit() {
    this.captura=JSON.parse(localStorage.getItem('aprob'))
    this.subscripcion = this.guardia.concedeAprob.subscribe(({ accesoAprob }) => {
      this.concedido = accesoAprob;
    })
    // if (this.concedido!=true) {
    //   this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
    // }
    this.mensaje = this.captura['mensaje']
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  seguir() {
    this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/' + 'interna']);
  }

}
