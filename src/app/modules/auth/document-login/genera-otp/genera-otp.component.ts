import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { DocumentLoginService } from 'app/core/service/document-login.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genera-otp',
  templateUrl: './genera-otp.component.html',
  styleUrls: ['./genera-otp.component.scss']
})
export class GeneraOTPComponent implements OnInit {
  @ViewChild('comingSoonNgForm') comingSoonNgForm: NgForm;
  paso=1;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  comingSoonForm: FormGroup;
  showAlert: boolean = false;
  infoApp = environment;
  datosUsuario: any;
  botonff: boolean;

  datosOtp = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _documentLoginService: DocumentLoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    console.log(this.datosUsuario)
    this.comingSoonForm = this._formBuilder.group({
      documento: ['', [Validators.required]]
    });
  }

  generarOTP(): void {
    this.botonff = true;
    const response = JSON.parse(localStorage.getItem('datosOtp'));

    const data: any = {
        "identificacion":  this.datosUsuario.identificacion,
        "unidadNegocio": 32,
        "infoValidar": response.infoValidar,
        "infoIniOTP": response.infoIniOTP,
        "infoToken": response.infoToken
    };
    
    this._documentLoginService.generarOTP(data).subscribe(resp => {
      console.log(resp)
      if (resp.data.status==400) {
        this.router.navigate(['documentLogin/replay']);
      } else {
        switch (resp.data.proceso) {
          case 'PREGUNTAS':
            console.log('ERROR ', resp.data.mensaje);
            const question = JSON.stringify(resp.data.procesoPreguntas);
            localStorage.setItem('questions', question);
            this.router.navigate(['documentLogin/pregunta']);
            break;
          case 'VALIDAR-OTP':
            // this.router.navigate(['documentLogin/replay']);
            this.paso=2;
            console.log('CORRECTO ', resp.data.mensaje)
            break;
        }
      }
      this.botonff = false;
    })
    
  }

  validateOtp() {
    const response = JSON.parse(localStorage.getItem('datosOtp'));
    let data = {
      "identificacion":  this.datosUsuario.identificacion,
      "codigoOTP": this.comingSoonForm.value.documento,
      "unidadNegocio": 32,
      "infoValidar": response.infoValidar,
      "infoIniOTP": response.infoIniOTP,
    }
    this._documentLoginService.validarOTP(data).subscribe(resp => {
      console.log(resp)
    });
  }

}
