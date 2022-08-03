import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DocumentLoginService } from 'app/core/service/document-login.service';
import { MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.scss']
})
export class PreguntaComponent implements OnInit {
  preguntas: any[];
  respuestas = [];
  objres = {};
  temprespuesta: number = 0;
  cantPreguntas=0;
  vistaPregunta=0;
  cargando: boolean;
  lastbutton: boolean = false;

  datosUsuario = {};
  questions = {};
  infoToken = {};

  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(
    private _documentLoginService: DocumentLoginService,
    private router: Router,
    private activeroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let data=[];
    data.push(JSON.parse(localStorage.getItem('questions')));
    this.preguntas=data[0].Pregunta
    this.cantPreguntas = this.preguntas.length
    this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'))
    this.questions = JSON.parse(localStorage.getItem('questions'))
    this.infoToken = JSON.parse(localStorage.getItem('datosOtp'))
  }

  capturarRespuesta(item){
    this.temprespuesta = item;
    if (this.vistaPregunta==3) {
      this.lastbutton = true
    }
    if (this.respuestas[this.vistaPregunta]!=undefined) {
      this.objres = {
        idPregunta: this.preguntas[this.vistaPregunta].orden,
        idRespuesta: this.temprespuesta
      }
      this.respuestas[this.vistaPregunta] = this.objres
    }else{
      this.objres = {
        idPregunta: this.preguntas[this.vistaPregunta].orden,
        idRespuesta: this.temprespuesta
      }
      this.respuestas.push(this.objres)
    }
  }

  continuar(){
    this.vistaPregunta = this.vistaPregunta+1;
    this.cantPreguntas = this.cantPreguntas-1;
    if (this.cantPreguntas==0) {
      this.confirmar()
    }
  }

  anterior(){
    this.vistaPregunta = this.vistaPregunta-1;
    this.cantPreguntas = this.cantPreguntas+1;
  }

  confirmar(){
    this.cargando = true;
      let data = {
        identificacion: this.datosUsuario['identificacion'],
        unidadNegocio: parseInt(this.uni),
        id: this.questions['id'],
        registro: this.questions['registro'],
        respuesta: this.respuestas,
        infoToken: this.infoToken['infoToken']
      }
      this._documentLoginService.enviarPreguntas(data).subscribe(resp => {
        if (resp.data.mensaje=='NO APROBADO') {
          const error = JSON.stringify(resp.data);
          localStorage.setItem('error', error);
          this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/no-aprobado']);

          let data={
            "unidadNegocio": parseInt(this.uni),
            "numeroSolicitud": parseInt(this.soli)
          }
          this._documentLoginService.archivosThomas(data).subscribe(resp => {
            Swal.fire(
              'Correcto', 
            'Se ha enviado un correo para continuar con el proceso', 
            'success')
          })
        }else{
          Swal.fire(
            'Correcto',
            'Sus respuestas fueron enviadas exitosamente.',
            'success'
          )
          this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/finalizado']);

          let data={
            "unidadNegocio": parseInt(this.uni),
            "numeroSolicitud": parseInt(this.soli)
          }
          this._documentLoginService.archivosThomas(data).subscribe(resp => {
            Swal.fire(
              'Correcto', 
            'Se ha enviado un correo para continuar con el proceso', 
            'success')
          })
        }
        this.cargando = false;
      })
  }

}

