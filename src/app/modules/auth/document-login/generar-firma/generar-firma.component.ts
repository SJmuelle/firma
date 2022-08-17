import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirmaInternaService } from 'app/core/service/firma-interna.service';

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

  constructor(
    private _formBuilder: FormBuilder, 
    private router: Router,
    private activeroute: ActivatedRoute,
    private firmainterna: FirmaInternaService) { }

  ngOnInit() {
    this.generarForm = this._formBuilder.group({
      pass: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(8), this.numberValid, this.lowercaseUppercaseValid, this.repeatLetter]],
      confpass: ['', [Validators.required]]
    }, { validator: this.confirmPassword });
  }

  seguir() {
    this.Btndisabled = true;
    let data = {
      "numeroSolicitud": parseInt(this.soli),
      "tipoTercero":"S",
      "unidadNegocio":parseInt(this.uni),
      "claveFirma":this.generarForm.value.pass
    }

    this.firmainterna.solicitarFirmar(data).subscribe(resp => {
      if (resp.status == 200) {
        const titulo = JSON.stringify(resp.data.title);
        const cuerpo = JSON.stringify(resp.data.body);
        const correo = JSON.stringify(resp.data.value);
        localStorage.setItem('titulo', titulo);
        localStorage.setItem('cuerpo', cuerpo);
        localStorage.setItem('correo', correo);
        this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/finalizar-firma']);  
        this.Btndisabled = false;
      }
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
    const mayuscula = new RegExp('.*[a-zA-Z].*');
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
