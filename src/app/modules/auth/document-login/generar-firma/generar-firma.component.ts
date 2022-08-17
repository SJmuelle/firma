import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generar-firma',
  templateUrl: './generar-firma.component.html',
  styleUrls: ['./generar-firma.component.scss']
})
export class GenerarFirmaComponent implements OnInit {

  generarForm: FormGroup;
  showAlert: boolean = false;

  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(
    private _formBuilder: FormBuilder, 
    private router: Router,
    private activeroute: ActivatedRoute) { }

  ngOnInit() {
    this.generarForm = this._formBuilder.group({
      pass: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(8), this.numberValid, this.lowercaseUppercaseValid, this.repeatLetter]],
      confpass: ['', [Validators.required]]
    }, { validator: this.confirmPassword });
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
