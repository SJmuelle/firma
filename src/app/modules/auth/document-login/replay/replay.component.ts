import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardianService } from 'app/core/service/guardian.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.scss']
})
export class ReplayComponent implements OnInit {

  concedido:any;
  acceso: boolean;
  subscripcion: Subscription;
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(private router: Router, private activeroute: ActivatedRoute, private guardia: GuardianService,) { }

  ngOnInit(): void {
    // this.subscripcion = this.guardia.conceder.subscribe(({ acceso }) => {
    //   this.concedido = acceso;
    // })
    // if (this.concedido!=true) {
    //   this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
    // }else{
    //   this.guardia.conceder.next({acceso: this.acceso=false})
    // }
  }

  // ngOnDestroy() {
  //   this.subscripcion.unsubscribe();
  // }

  seguir() {
    this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
  }

}
