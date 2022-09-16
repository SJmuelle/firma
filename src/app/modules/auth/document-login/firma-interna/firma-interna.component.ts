import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DocumentLoginService } from 'app/core/service/document-login.service';
import { ClausulaComponent } from './clausula/clausula.component';
import { Subscription } from 'rxjs';
import { GuardianService } from 'app/core/service/guardian.service';

@Component({
  selector: 'app-firma-interna',
  templateUrl: './firma-interna.component.html',
  styleUrls: ['./firma-interna.component.scss']
})
export class FirmaInternaComponent implements OnInit {

  checkForm: FormGroup;
  showAlert: boolean = false;
  concedido: any;
  subscripcion: Subscription;
  acceso: boolean;
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private guardia: GuardianService,
    private activeroute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.subscripcion = this.guardia.concedeInterna.subscribe(({ accesoInterna }) => {
      this.concedido = accesoInterna;
    })
    // if (this.concedido!=true) {
    //   this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
    // }
    this.checkForm = this._formBuilder.group({
      politica: ['', Validators.requiredTrue],
      clausula: ['', Validators.requiredTrue]
    });
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  concederAccesoDocu(){
    this.acceso = true;
    this.guardia.concedeDocu.next({accesoDocu: this.acceso})
  }

  abrirClausula(){
    const dialogRef = this.dialog.open(ClausulaComponent, {
      width: '80%'
    });
  }

  seguir() {
    this.concederAccesoDocu()
    this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/' + 'docu-firma']);
  }

}
