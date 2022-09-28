import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirmaInternaService } from 'app/core/service/firma-interna.service';
import { MatDialog } from '@angular/material/dialog';
import { CondicionesComponent } from './condiciones/condiciones.component';
import { Subscription } from 'rxjs';
import { GuardianService } from 'app/core/service/guardian.service';

@Component({
  selector: 'app-generar-firma',
  templateUrl: './generar-firma.component.html',
  styleUrls: ['./generar-firma.component.scss']
})
export class GenerarFirmaComponent implements OnInit {
  Btndisabled: boolean;
  generarForm: FormGroup;
  showAlert: boolean = false;
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')
  listadoArchivos: any = [];
  base64: any = {};
  concedido: any;
  subscripcion: Subscription;
  acceso: boolean;
  datosUsuario: any;

  constructor(
    private _formBuilder: FormBuilder, 
    private router: Router,
    private activeroute: ActivatedRoute,
    private firmainterna: FirmaInternaService,
    private guardia: GuardianService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.subscripcion = this.guardia.conceder.subscribe(({ acceso }) => {
      this.concedido = acceso;
    })
    if (this.concedido!=true) {
      this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
    }
    this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    this.guardia.conceder.next({acceso: this.acceso=false})
    this.generarForm = this._formBuilder.group({
      condiciones: ['', Validators.requiredTrue],
      pass: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(8), this.numberValid, this.lowercaseUppercaseValid, this.repeatLetter]],
      confpass: ['', [Validators.required]]
    }, { validator: this.confirmPassword });
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }
  
  conceder(){
    this.acceso = true;
    this.guardia.conceder.next({acceso: this.acceso})
  }

  abrirCondiciones(){
    const dialogRef = this.dialog.open(CondicionesComponent, {
      disableClose: true,
      width: '90%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.generarForm.setValue({
        condiciones: true,
        pass: '',
        confpass: ''
      })
    })
  }

  seguir() {
    this.Btndisabled = true;
    let data = {
      "numeroSolicitud": parseInt(this.soli),
      "tipoTercero":"T",
      "unidadNegocio":parseInt(this.uni),
      "claveFirma":this.generarForm.value.pass,
      "aplicaThomas": true,
      "identificacion":this.datosUsuario.identificacion
    }

    this.firmainterna.solicitarFirmar(data).subscribe(resp => {
      if (resp.status == 200) {
        const final = JSON.stringify(resp.data);
        localStorage.setItem('final', final);
        let datos = {
          "numeroSolicitud":parseInt(this.soli),
          "unidadNegocio":parseInt(this.uni),
          "tipoTercero":"T",
          "firma":this.generarForm.value.pass
        }
        this.pagare(datos)
      }
    }, err => {
      this.Btndisabled = false;
    })
  }

  pagare(datos){
    this.firmainterna.pagare(datos).subscribe(resp => {
      if (resp.status == 200) {
        const base64 = JSON.stringify(resp.data.base64);
        localStorage.setItem('pagare', base64);
        this.conceder();
        this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/finalizar-firma']);  
        this.Btndisabled = false;
      }
    }, err=> {
      this.Btndisabled = false;
    })
  }

  numberValid(control: FormControl): { [s: string]: boolean } {
    const mayuscula = new RegExp('.*[0-9].*');
    if (control.value !== '' && !control.value.match(mayuscula)) {
      return { notNumber: true };
    }
    return null;
  }

  lowercaseUppercaseValid(control: FormControl): { [s: string]: boolean } {
    const mayuscula = new RegExp('.*[A-Z].*');
    if (!control.value.match(mayuscula) && control.value !== '') {
      return { notLowerUpper: true };
    }
    return null;
  }

  repeatLetter(control: FormControl): { [s: string]: boolean } {
    const repeat = new RegExp('.*([a-z])\\1{4,}.*');
    if (control.value !== '' && control.value.match(repeat)) {
      return { notRepite: true };
    }
    return null;
  }

  confirmPassword(group: FormGroup) {
    const pass = group.controls.pass.value;
    const confirmpass = group.controls.confpass.value;
    if (pass !== confirmpass) {
      group.controls.confpass.setErrors({ notSame: true });
    }
    return null;
  }

}
