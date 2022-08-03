import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')
  datosOtp = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _documentLoginService: DocumentLoginService,
    private router: Router,
    private activeroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    this.comingSoonForm = this._formBuilder.group({
      documento: ['', [Validators.required]]
    });
  }

  generarOTP(): void {
    this.botonff = true;
    const response = JSON.parse(localStorage.getItem('datosOtp'));

    const data: any = {
        "identificacion":  this.datosUsuario.identificacion,
        "unidadNegocio": parseInt(this.uni),
        "infoValidar": response.infoValidar,
        "infoIniOTP": response.infoIniOTP,
        "infoToken": response.infoToken
    };
    
    this._documentLoginService.generarOTP(data).subscribe(resp => {
      console.log(resp)
      if (resp.data.status==400) {
        this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/replay']);
      } else {
        switch (resp.data.proceso) {
          case 'PREGUNTAS':
            const question = JSON.stringify(resp.data.procesoPreguntas);
            localStorage.setItem('questions', question);
            this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/pregunta']);
            break;
          case 'VALIDAR-OTP':
            this.paso=2;
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
      "unidadNegocio": parseInt(this.uni),
      "infoValidar": response.infoValidar,
      "infoIniOTP": response.infoIniOTP,
      "infoToken": response.infoToken
    }
    this._documentLoginService.validarOTP(data).subscribe(resp => {
      console.log(resp)
      if (resp.status == 200) {
        if (resp.data.status==400) {
          this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/replay']);
        } else {
          switch (resp.data.PROCESO) {
            case 'PREGUNTAS':
              const question = JSON.stringify(resp.data.procesoPreguntas);
              localStorage.setItem('questions', question);
              this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/pregunta']);
              break;
            case 'aprobado':
              Swal.fire(
                'Correcto',
                'Su credito ha sido aprobado',
                'success'
              )
              this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/finalizado']);
              break;
            case 'no aprobado':
              Swal.fire(
                'Error',
                'Su credito no ha sido aprobado',
                'error'
              )
              this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/replay']);
              break;
            case 'reiniciar flujo':
              Swal.fire(
                'Información',
                'Debe reiniciar el proceso nuevamente',
                'info'
              )
              this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
              break;
          }
        }
      }
    });
  }

}
