import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirmaInternaService } from 'app/core/service/firma-interna.service';

@Component({
  selector: 'app-validar-otp-firma',
  templateUrl: './validar-otp-firma.component.html',
  styleUrls: ['./validar-otp-firma.component.scss']
})
export class ValidarOtpFirmaComponent implements OnInit {

  seconds: number = 150;
  showAlert: boolean = false;
  intervalo: any;
  validarForm: FormGroup;
  botonff: boolean;

  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')
  telefono: any;

  constructor(
    private _formBuilder: FormBuilder, 
    private router: Router,
    private activeroute: ActivatedRoute,
    private firmainterna: FirmaInternaService
    ) { }

  ngOnInit() {
    this.telefono = localStorage.getItem('telefono')
    this.validarForm = this._formBuilder.group({
      codigo: ['', [Validators.required]]
    });

    this.intervalo = setInterval(() => {
      this.seconds = this.seconds - 1;
      if(this.seconds == 0){
        clearInterval(this.intervalo);
      }
    }, 1000);
  }

  seguir() {
    
    clearInterval(this.intervalo);

    let data = {
      "numeroSolicitud": parseInt(this.soli),
      "tipoTercero":"S",
      "numeroOTP": this.validarForm.value.codigo
    }

    this.firmainterna.solicitarValidar(data).subscribe(resp => {
      if (resp.status == 200) {
        this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/generar-firma']);  
      }
    })
  }
  
}
