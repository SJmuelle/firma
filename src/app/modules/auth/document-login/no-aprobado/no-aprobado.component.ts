import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardianService } from 'app/core/service/guardian.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-no-aprobado',
  templateUrl: './no-aprobado.component.html',
  styleUrls: ['./no-aprobado.component.scss']
})
export class NoAprobadoComponent implements OnInit {

  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')
  concedido: any;
  subscripcion: Subscription;
  acceso: boolean;

  constructor(private router: Router, private activeroute: ActivatedRoute, private guardia: GuardianService) { }

  ngOnInit() {
    // this.subscripcion = this.guardia.conceder.subscribe(({ acceso }) => {
    //   this.concedido = acceso;
    // })
    // if (this.concedido!=true) {
    //   this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
    // }else{
    //   this.guardia.conceder.next({acceso: this.acceso=false})
    // }
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  seguir() {
    this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
  }

}
