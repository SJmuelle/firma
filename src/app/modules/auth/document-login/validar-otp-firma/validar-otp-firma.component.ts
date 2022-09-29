import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirmaInternaService } from 'app/core/service/firma-interna.service';
import { GuardianService } from 'app/core/service/guardian.service';
import { Subscription } from 'rxjs';

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
  reenvio: boolean = false;
  btnreenvio: boolean;
  concedido: any;
  subscripcion: Subscription;
  acceso: boolean;
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')
  telefono: any;
  correo: any;
  captura: {}

  constructor(
    private _formBuilder: FormBuilder, 
    private router: Router,
    private activeroute: ActivatedRoute,
    private guardia: GuardianService,
    private firmainterna: FirmaInternaService
    ) { }

  ngOnInit() {
    this.subscripcion = this.guardia.conceder.subscribe(({ acceso }) => {
      this.concedido = acceso;
    })
    if (this.concedido!=true) {
      this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
    }else{
      this.guardia.conceder.next({acceso: this.acceso=false})
      this.telefono = JSON.parse(localStorage.getItem('telefono'))
      // this.captura=JSON.parse(localStorage.getItem('correo'))
      // this.correo = this.captura['value']
    }
    this.validarForm = this._formBuilder.group({
      codigo: ['', [Validators.required]]
    });

    this.intervalo = setInterval(() => {
      this.seconds = this.seconds - 1;
      if(this.seconds == 0){
        this.reenvio = true;
        this.validarForm.disable();
        clearInterval(this.intervalo);
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  conceder(){
    this.acceso = true;
    this.guardia.conceder.next({acceso: this.acceso})
  }

  seguir() {
    this.botonff = true;
    clearInterval(this.intervalo);
    let data = {
      "numeroSolicitud": parseInt(this.soli),
      "tipoTercero":"T",
      "numeroOTP": this.validarForm.value.codigo
    }
    this.firmainterna.solicitarValidar(data).subscribe(resp => {
      if (resp.status == 200) {
        this.botonff = false;
        this.conceder();
        this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/generar-firma']);  
      }else{
        this.botonff = true;
      }
    })
  }

  reenviar(){
    this.seconds = 150;
    this.validarForm.enable();
    this.reenvio = false;
    this.btnreenvio = true;

    let data = {
      "numeroSolicitud": parseInt(this.soli),
      "tipo":"T"
    }

    this.firmainterna.solicitarGenerar(data).subscribe(resp => {
      if (resp.status == 200) {
        this.intervalo = setInterval(() => {
          this.seconds = this.seconds - 1;
          if(this.seconds == 0){
            this.reenvio = true;
            this.btnreenvio = false;
            this.validarForm.disable();
            clearInterval(this.intervalo);
          }
        }, 1000);
      }
      this.reenvio = false;
      this.btnreenvio = true;
    })

    
  }
  
}
