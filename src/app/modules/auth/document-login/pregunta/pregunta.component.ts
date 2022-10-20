import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DocumentLoginService } from 'app/core/service/document-login.service';
import { MatTabGroup } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { GuardianService } from 'app/core/service/guardian.service';

@Component({
    selector: 'app-pregunta',
    templateUrl: './pregunta.component.html',
    styleUrls: ['./pregunta.component.scss']
})
export class PreguntaComponent implements OnInit {

    @ViewChild('courseSteps', { static: true }) courseSteps: MatTabGroup;
    currentStep: number = 0;
    allNumQues: any[];

    preguntas: any[];
    respuestas = [];
    objres = {};
    temprespuesta: number = 0;
    cantPreguntas = 0;
    containRespuesta: number = 0;
    vistaPregunta = 0;
    conteoup: number = 1;
    totalpreguntas: number = 4;
    cargando: boolean;
    lastbutton: boolean = false;

    selected: number = 0;

    selectUno:number = 0;
    selectDos:number = 0;
    selectTres:number = 0;
    selectCuatro:number = 0;

    respondidas:any[] = [];

    hidecharge: boolean;

    textCapi: string;

    datosUsuario = {};
    questions = {};
    infoToken = {};

    soli: string = this.activeroute.snapshot.paramMap.get('num')
    uni: string = this.activeroute.snapshot.paramMap.get('uni')

    concedido:any;
    subscripcion: Subscription;
    acceso: boolean;

    constructor(
        private _documentLoginService: DocumentLoginService,
        private router: Router,
        private activeroute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private guardia: GuardianService
    ) { }

    ngOnInit(): void {
        this.subscripcion = this.guardia.conceder.subscribe(({ acceso }) => {
            this.concedido = acceso;
        })
        if (this.concedido!=true) {
            this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
        }else{
            this.guardia.conceder.next({acceso: this.acceso=false})
            let data = [];
            data.push(JSON.parse(localStorage.getItem('questions')));
            this.preguntas = data[0].Pregunta
            this.cantPreguntas = this.preguntas.length
            this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'))
            this.questions = JSON.parse(localStorage.getItem('questions'))
            this.infoToken = JSON.parse(localStorage.getItem('datosOtp'))
            this.textCapi = this.preguntas[this.vistaPregunta].texto[0].toUpperCase() + this.preguntas[this.vistaPregunta].texto.slice(1).toLowerCase();
            this.allNumQues = [
                { order: 0 },
                { order: 1 },
                { order: 2 },
                { order: 3 }
            ]
        }
    }

    ngOnDestroy() {
        this.subscripcion.unsubscribe();
    }

    conceder(){
        this.acceso = true;
        this.guardia.conceder.next({acceso: this.acceso})
    }

    capturarRespuesta(item, index) {
        this.temprespuesta = item;
        this.selected = item;
        if (this.respondidas[index]==null) {
            this.respondidas.push(this.selected)
        } else {
            this.respondidas[index] = this.selected;
        }
        this.containRespuesta = this.containRespuesta + 1;
        if (this.vistaPregunta == 3) {
            this.lastbutton = true
        }
        if (this.respuestas[this.vistaPregunta] != undefined) {
            this.objres = {
                idPregunta: this.preguntas[this.vistaPregunta].orden,
                idRespuesta: this.temprespuesta
            }
            this.respuestas[this.vistaPregunta] = this.objres
        } else {
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

    continuar(index) {
        this.vistaPregunta = this.vistaPregunta + 1;
        this.cantPreguntas = this.cantPreguntas - 1;
        this.goToStep(this.vistaPregunta)
        if (this.vistaPregunta == 4) {
            this.vistaPregunta = 3;
            if (this.cantPreguntas == 0) {
                this.confirmar()
            }
        } else {
            this.textCapi = this.preguntas[this.vistaPregunta].texto[0].toUpperCase() + this.preguntas[this.vistaPregunta].texto.slice(1).toLowerCase();
        }
        if (this.respondidas[index+1]==null) {
            this.selected = 0;
        }else{
            this.selected = this.respondidas[index+1];
        }
    }

    anterior(index) {
        this.vistaPregunta = this.vistaPregunta - 1;
        this.cantPreguntas = this.cantPreguntas + 1;
        this.goToStep(this.vistaPregunta)
        this.textCapi = this.preguntas[this.vistaPregunta].texto[0].toUpperCase() + this.preguntas[this.vistaPregunta].texto.slice(1).toLowerCase();
        if (this.respondidas[index-1]!=null) {
            this.selected = this.respondidas[index-1];
        }else{
            this.selected = 0;
        }
    }

    confirmar() {
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
            if (resp.data.status == 400) {
                const error = JSON.stringify(resp.data);
                localStorage.setItem('error', error);
                this.conceder();
                this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/no-aprobado']);
            } else {
                const aprob = JSON.stringify(resp.data);
                localStorage.setItem('aprob', aprob);
                this.conceder();
                this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/interna']);
            }
            this.cargando = false;
        }, error => {
            this.cargando = false;
            Swal.fire(
                'Aviso',
                'Ha habido un error al procesar sus respuestas, porfavor intente mas tarde',
                'error'
              )
          })
    }
}

