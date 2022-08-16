import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DocumentLoginService } from 'app/core/service/document-login.service';
import { ClausulaComponent } from './clausula/clausula.component';

@Component({
  selector: 'app-firma-interna',
  templateUrl: './firma-interna.component.html',
  styleUrls: ['./firma-interna.component.scss']
})
export class FirmaInternaComponent implements OnInit {

  checkForm: FormGroup;
  showAlert: boolean = false;

  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private activeroute: ActivatedRoute,
    private _documentLoginService: DocumentLoginService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.checkForm = this._formBuilder.group({
      politica: ['', Validators.requiredTrue],
      clausula: ['', Validators.requiredTrue]
    });
  }

  abrirClausula(){
    const dialogRef = this.dialog.open(ClausulaComponent, {
      width: '30%'
    });
  }

  seguir() {
    this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/' + 'docu-firma']);
  }

}
