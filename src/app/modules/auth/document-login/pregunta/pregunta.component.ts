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
  conteoup: number = 1;
  totalpreguntas: number = 4;
  cargando: boolean;
  lastbutton: boolean = false;

  textCapi: string;

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
    // console.log(this.preguntas[0].texto.slice(1).toLowerCase())
    this.textCapi = this.preguntas[this.vistaPregunta].texto[0].toUpperCase()+this.preguntas[this.vistaPregunta].texto.slice(1).toLowerCase();
    console.log(this.textCapi)
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
    this.conteoup = this.conteoup + 1
    if (this.vistaPregunta == 4) {
      if (this.cantPreguntas==0) {
        this.confirmar()
      }
    }else{
      this.textCapi = this.preguntas[this.vistaPregunta].texto[0].toUpperCase()+this.preguntas[this.vistaPregunta].texto.slice(1).toLowerCase();
      console.log(this.textCapi)
    }
    
    
  }

  anterior(){
    this.vistaPregunta = this.vistaPregunta-1;
    this.cantPreguntas = this.cantPreguntas+1;
    this.conteoup = this.conteoup - 1
    this.textCapi = this.preguntas[this.vistaPregunta].texto[0].toUpperCase()+this.preguntas[this.vistaPregunta].texto.slice(1).toLowerCase();
    console.log(this.textCapi)
  }

  confirmar(){
    this.cargando = true;
      let data = {
        identificacion: this.datosUsuario['identificacion'],
        unidadNegocio: parseInt(this.uni),
        id: this.questions['id'],
        registro: this.questions['registro'],
        respuesta: this.respuestas,
        infoToken: this.infoToken['infoToken'],
        aplicaThomas: true,
        numeroSolicitud: parseInt(this.soli)
      }
      
      Swal.fire({
        title: 'Cargando',
        html:
        '<div class="space-loading">' + 
            '<div class="loading loading--full-height"></div>' +
        '</div>',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          // Swal.showLoading();
          
          this._documentLoginService.enviarPreguntas(data).subscribe(resp => {
            if (resp.data.mensaje=='NO APROBADO') {
              const error = JSON.stringify(resp.data);
              localStorage.setItem('error', error);
              this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/no-aprobado']);
            }else{
              this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/aprobado']);
            }
            this.cargando = false;
            Swal.close()
          })
        },
      })
      
  }

}

