import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardianService } from 'app/core/service/guardian.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-finalizado',
  templateUrl: './finalizado.component.html',
  styleUrls: ['./finalizado.component.scss']
})
export class FinalizadoComponent implements OnInit {

  concedido:any;
  subscripcion: Subscription;
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(private router: Router, private activeroute: ActivatedRoute, private guardia: GuardianService,) { }

  ngOnInit(): void {
    this.subscripcion = this.guardia.concedeFinal.subscribe(({ accesoFinal }) => {
      this.concedido = accesoFinal;
    })
    // if (this.concedido!=true) {
    //   this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
    // }
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
}

}
