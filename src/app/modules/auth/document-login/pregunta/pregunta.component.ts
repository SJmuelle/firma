import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DocumentLoginService } from 'app/core/service/document-login.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.scss']
})
export class PreguntaComponent implements OnInit {

  @ViewChild('courseSteps', {static: true}) courseSteps: MatTabGroup;
  currentStep: number = 0;
  allNumQues: any[];

  preguntas: any[];
  respuestas = [];
  objres = {};
  temprespuesta: number = 0;
  cantPreguntas=0;
  containRespuesta: number = 0;
  vistaPregunta=0;
  conteoup: number = 1;
  totalpreguntas: number = 4;
  cargando: boolean;
  lastbutton: boolean = false;
  selected: boolean = false;

  hidecharge: boolean;

  textCapi: string;

  datosUsuario = {};
  questions = {};
  infoToken = {};

  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(
    private _documentLoginService: DocumentLoginService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    let data=[];
    data.push(JSON.parse(localStorage.getItem('questions')));
    this.preguntas=data[0].Pregunta
    this.cantPreguntas = this.preguntas.length
    this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'))
    this.questions = JSON.parse(localStorage.getItem('questions'))
    this.infoToken = JSON.parse(localStorage.getItem('datosOtp'))
    this.textCapi = this.preguntas[this.vistaPregunta].texto[0].toUpperCase()+this.preguntas[this.vistaPregunta].texto.slice(1).toLowerCase();
    this.allNumQues = [
      {order   : 0},
      {order   : 1 },
      {order   : 2},
      {order   : 3}
    ]
  }

  capturarRespuesta(item){
    this.temprespuesta = item;
    this.selected = item;
    this.containRespuesta = this.containRespuesta + 1;
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

  goToStep(step: number): void {
    this.currentStep = step;
    this._changeDetectorRef.markForCheck();
    
  }

  continuar(){
    this.vistaPregunta = this.vistaPregunta+1;
    this.cantPreguntas = this.cantPreguntas-1;
    if (this.vistaPregunta == 4) {
      this.vistaPregunta = 3;
      if (this.cantPreguntas==0) {
        this.confirmar()
      }
    }else{
      this.textCapi = this.preguntas[this.vistaPregunta].texto[0].toUpperCase()+this.preguntas[this.vistaPregunta].texto.slice(1).toLowerCase();
    }
  }

  anterior(){
    this.vistaPregunta = this.vistaPregunta-1;
    this.cantPreguntas = this.cantPreguntas+1;
    this.goToStep(this.vistaPregunta)
    this.textCapi = this.preguntas[this.vistaPregunta].texto[0].toUpperCase()+this.preguntas[this.vistaPregunta].texto.slice(1).toLowerCase();
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

      this._documentLoginService.enviarPreguntas(data).subscribe(resp => {
        if (resp.data.status==400) {
          const error = JSON.stringify(resp.data);
          localStorage.setItem('error', error);
          this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/no-aprobado']);
        }else{
          this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/aprobado']);
        }
        this.cargando = false;
      })

      // Swal.fire({
      //   title: 'Cargando',
      //   imageUrl: 'assets/images/pages/cargando.gif',
      //   allowOutsideClick: false,
      //   showConfirmButton: false,
      //   customClass: 'swal-height',
      //   didOpen: () => {
      //     // Swal.showLoading();
          
      //     this._documentLoginService.enviarPreguntas(data).subscribe(resp => {
      //       if (resp.data.status==400) {
      //         const error = JSON.stringify(resp.data);
      //         localStorage.setItem('error', error);
      //         this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/no-aprobado']);
      //       }else{
      //         this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/aprobado']);
      //       }
      //       this.cargando = false;
      //       Swal.close()
      //     })
      //   },
      // })
      
  }

}

