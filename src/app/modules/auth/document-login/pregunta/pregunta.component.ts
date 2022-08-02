import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DocumentLoginService } from 'app/core/service/document-login.service';

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

  datosUsuario = {};
  questions = {};
  infoToken = {};

  constructor(
    private _documentLoginService: DocumentLoginService,
    private router: Router,
    private activaroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let data=[];
    data.push(JSON.parse(localStorage.getItem('questions')));
    this.preguntas=data[0].Pregunta
    console.log(this.preguntas)
    this.cantPreguntas = this.preguntas.length
    this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'))
    this.questions = JSON.parse(localStorage.getItem('questions'))
    this.infoToken = JSON.parse(localStorage.getItem('datosOtp'))
  }

  capturarRespuesta(item){
    this.temprespuesta = item;
    console.log(this.temprespuesta)
  }

  continuar(){
    this.objres = {
      idPregunta: this.preguntas[this.vistaPregunta].orden,
      idRespuesta: this.temprespuesta
    }
    this.respuestas.push(this.objres)
    this.vistaPregunta = this.vistaPregunta+1;
    this.cantPreguntas = this.cantPreguntas-1;
    console.log(this.respuestas)
    this.temprespuesta = 0;
  }

  anterior(){
    console.log(this.vistaPregunta)
    this.respuestas.pop()
    this.vistaPregunta = this.vistaPregunta-1;
    this.cantPreguntas = this.cantPreguntas+1;
    console.log(this.respuestas)
  }

  confirmar() {
    let data = {
      identificacion: this.datosUsuario['identificacion'],
      unidadNegocio: 32,
      id: this.questions['id'],
      registro: this.questions['registro'],
      respuesta: this.respuestas,
      infoToken: this.infoToken['infoToken']
    }
    console.log(data)
    this._documentLoginService.enviarPreguntas(data).subscribe(resp => {
      if (resp) {
        console.log(resp)
        Swal.fire(
          'Correcto',
          'Sus respuestas fueron enviadas exitosamente.',
          'success'
        )
        this.router.navigate(['documentLogin/finalizado']);
      }
    })
  }

}

