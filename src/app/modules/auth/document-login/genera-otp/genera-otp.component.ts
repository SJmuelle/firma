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

  generarOTP(){
    let data={
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
      }
    }
    this._documentLoginService.generarOTP(data).subscribe(resp => {
      console.log(resp)
      if(resp.data.status==400){
        // localStorage.setItem('ERROR', resp.data.mensaje);
        // this.router.navigate(['documentLogin/replay']);
        console.log('ERROR ', resp.data.mensaje)
      }else{
        // this.router.navigate(['documentLogin/finalizado']);
        this.paso=2;
        console.log('CORRECTO ', resp.data.mensaje)
      }
    })
  }

}
