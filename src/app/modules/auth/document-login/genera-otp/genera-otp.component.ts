import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { DocumentLoginService } from 'app/core/service/document-login.service';
import { environment } from 'environments/environment';

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
    const response = JSON.parse(localStorage.getItem('datosOtp'));
    /*const data: any = {
      "identificacion":  this.datosUsuario.identificacion,
      "unidadNegocio": 32,
      "infoValidar": {
        "valApellido": "true",
        "valNombre": "true",
        "valFechaExp": "true",
        "excluirCliente": "false",
        "alertas": "false",
        "respuestaAlerta": "01",
        "codigoAlerta": "08",
        "resultado": "01",
        "regValidacion": "6402815",
        "resultadoProceso": "true",
        "consultasDisponibles": "1",
        "Identificacion": {
          "numero": this.datosUsuario.identificacion,
          "tipo": this.datosUsuario.tipoDocumento
        },
        "Nombre": this.datosUsuario.nombreCompleto,
        "FechaExpedicion": {
          "timestamp": this.datosUsuario.fechaExpedicionDocumento
        }
      },
      "infoIniOTP": {
        "codParametrizacion": "3176",
        "DatosCuestionario": {
          "procesoEvidente": "VALDCN",
          "regValidacion": "6402815"
        },
        "ResultadoGeneracion": {
          "codResultadoOTP": "4",
          "idTransaccionOTP": "236fe796-cad2-4238-9305-13f6c13dcd2d",
          "resultadoOTP": "true"
        }
      },
      "infoToken": {
          "token_type": "Bearer",
          "expires_in": 14400,
          "access_token": "eyJraWQiOiJDVUtpdUdzdXlsY3B0UHpkUlNUZTNXZ3BWeFpCZ2NtQmF3SnVOc0JvNk53IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlFEZHR6a1BJSkpvWmltcUJfemlzdktFbXZieThFVEJuekMtUXhqZGF3Y0UiLCJpc3MiOiJodHRwczovL2V4cGVyaWFuLWxhdGFtYi5va3RhcHJldmlldy5jb20vb2F1dGgyL2F1c2Rid2k3cGVzNzFuMGhVMGg3IiwiYXVkIjoiaHR0cHM6Ly93d3cuZGF0YWNyZWRpdG8uY29tLmNvL2NsaWVudHMiLCJpYXQiOjE2NTkwNDk5ODIsImV4cCI6MTY1OTA2NDM4MiwiY2lkIjoiMG9hMTdpYXJxdW02WWJ0UjYwaDgiLCJ1aWQiOiIwMHUxOG5lZjd3MW5XeklMUjBoOCIsInNjcCI6WyJleHBjb19ldmlkZW50ZV9tYXN0ZXIiXSwiYXV0aF90aW1lIjoxNjU5MDQ5OTgyLCJzdWIiOiIyLTgwMjAyMjAxNi4xQGRlbW8uZGF0YWNyZWRpdG8uY29tLmNvIiwiZXhwY29fYmFzZV9lbWFpbCI6ImptZXJjYWRvQGZpbnRyYS5jbyIsImV4cGNvX2Jhc2VfbGFzdE5hbWUiOiJGaW50cmEgcy5hIiwiZXhwY29fYmFzZV9pZFR5cGUiOiIyIiwiZXhwY29fYmFzZV9maXJzdE5hbWUiOiJVc3VhcmlvIFdzIiwiZXhwY29fYXV0aHpfZXZpZGVudGVfbWFzdGVyIjoieyB9IiwiZXhwY29fYmFzZV9sb2dpbiI6IjItODAyMDIyMDE2LjFAZGVtby5kYXRhY3JlZGl0by5jb20uY28iLCJleHBjb19iYXNlX2FwaVVzZXIiOnRydWUsImV4cGNvX2Jhc2VfaWROdW1iZXIiOiI4MDIwMjIwMTYuMSJ9.UEZOPcOUWvzYiGSL3iLjLZp7uMSu9BfIkIiGfNfSj7vXyVusZY1pMCQ8uVnczRtNAHN3k38uwWAhSodfRXv80iatWWW8RHsoucxKWIEoP_dqliaK59qFwh-K_lx69iJVNcsKvITWn1Ow1PJAxS_Ka45Q36RDdIxEbxGfKa5WX-BTujEJWRHQjaWojDi7nTWGCigs44rS1ED2JoPcWb0Mm3jC8MWLaJvE3GBF4iHu10LkAjNa8t3fPyDo1BSiQfXH-kjgyXqVZA7ubcrM7KIwXj-3Q27Y08MNDNCqeH_b2zq8CerTlC0JYP6xBEYp5eBstAoLvxtjx-RwqCf5FIvZPA",
          "scope": "expco_evidente_master"
      }
    };*/
      const data: any = {
          "identificacion":  this.datosUsuario.identificacion,
          "unidadNegocio": 32,
          "infoValidar": response.infoValidar,
          "infoIniOTP": response.infoIniOTP,
          "infoToken": response.infoToken
      };
    this._documentLoginService.generarOTP(data).subscribe(resp => {
      console.log(resp)
      if(resp.data.proceso == 'PREGUNTAS') {
        // localStorage.setItem('ERROR', resp.data.mensaje);
        console.log('ERROR ', resp.data.mensaje);
        const question = JSON.stringify(resp.data.procesoPreguntas);
        localStorage.setItem('questions', question);
        this.router.navigate(['documentLogin/pregunta']);
      }else{
        // this.router.navigate(['documentLogin/finalizado']);
        this.paso=2;
        console.log('CORRECTO ', resp.data.mensaje)
      }
    })
  }

  validateOtp() {
      if (this.comingSoonForm.valid) {
          const data = this.comingSoonForm.getRawValue();

      }
  }

}
