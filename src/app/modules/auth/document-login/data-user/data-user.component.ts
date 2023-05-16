import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentLoginService } from 'app/core/service/document-login.service';
import { GuardianService } from 'app/core/service/guardian.service';
import { UtilityEvidenteService } from 'app/core/service/utility-evidente.service';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.scss']
})
export class DataUserComponent implements OnInit {
  datosUsuario: any;
  Btndisabled: boolean;
  concedido: any;
  subscripcion: Subscription;
  acceso:boolean;
  idRUL: string = this.activeroute.snapshot.paramMap.get('doc');
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')
  tipo: string = this.activeroute.snapshot.paramMap.get('tipo')
  constructor(
    private _documentLoginService: DocumentLoginService,
    private guardia: GuardianService,
    private router: Router,
    private activeroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscripcion = this.guardia.conceder.subscribe(({ acceso }) => {
      this.concedido = acceso;
    })
    if (this.concedido!=true) {
      this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni+'/' + this.tipo]);
    }else{
      this.guardia.conceder.next({acceso: this.acceso=false})
      this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
      if (this.idRUL != this.datosUsuario.identificacion) {
        this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni+'/' + this.tipo]);
      }
    }
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  conceder(){
    this.acceso = true;
    this.guardia.conceder.next({acceso: this.acceso})
  }

  seguir() {
    this.Btndisabled = true;
    let evidente = this.datosUsuario.aplicaEvidente;
    if (evidente == 'SI') {
      let data = {
        "identificacion": this.datosUsuario.identificacion,
        "unidadNegocio": parseInt(this.uni),
        "numeroSolicitud": parseInt(this.soli)
      }
      this._documentLoginService.datosUsuarioEvidente(data).subscribe(resp => {
        if (resp.data == 400) {
          this.Btndisabled = false;
        } else {
          if (resp.data.status == 400) {
            localStorage.setItem('ERROR', resp.data.mensaje);
            this.Btndisabled = false;
            this.conceder();
            this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/' + this.tipo+'/replay']);
            return;
          } else {
            switch (resp.data.proceso) {
              case 'PREGUNTAS':
                const question = JSON.stringify(resp.data.procesoPreguntas);
                localStorage.setItem('questions', question);
                this.Btndisabled = false;
                this.conceder();
                this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/' + this.tipo +'/pregunta']);
                break;
              case 'OTP':
                const responseData: any = JSON.stringify({
                  infoValidar: resp.data.infoValidar,
                  infoIniOTP: resp.data.infoIniOTP,
                  infoToken: resp.data.infoToken
                });
                localStorage.setItem('datosOtp', responseData);
                this.generarOTP();
                break;
              default:
                break;
            }
          }
          this.Btndisabled = false;
        }
      }, error => {
        this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni+'/' + this.tipo]);
      })
    } else {
      let data = {
        "unidadNegocio": parseInt(this.uni),
        "numeroSolicitud": parseInt(this.soli)
      }
      this._documentLoginService.archivosThomas(data).subscribe(resp => {
        if (resp.data.status == 400) {
          localStorage.setItem('ERROR', resp.data.mensaje);
          this.conceder();
          this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni +'/' + this.tipo+ '/replay']);
          return;
        } else {
          this.conceder();
          this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni +'/' + this.tipo+ '/finalizado']);
        }
        this.Btndisabled = false;
      }, error => {
        this.Btndisabled = false;
      })
    }
  }

  generarOTP(): void {
    const response = JSON.parse(localStorage.getItem('datosOtp'));
    const data: any = {
      "identificacion": this.datosUsuario.identificacion,
      "unidadNegocio": parseInt(this.uni),
      "numeroSolicitud": parseInt(this.soli),
      "infoValidar": response.infoValidar,
      "infoIniOTP": response.infoIniOTP,
      "infoToken": response.infoToken
    };

    this._documentLoginService.generarOTP(data).subscribe(resp => {
      if (resp.data.status == 400) {
        if (resp.data.proceso == 'Lo sentimos no hay mas intentos disponibles.') {
          Swal.fire(
            'Aviso',
            resp.data.proceso,
            'error'
          )
          this.Btndisabled = false;
          this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni+'/' + this.tipo]);
        } else {
          this.Btndisabled = false;
          this.conceder();
          this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni +'/' + this.tipo+ '/replay']);
        }
      } else {
        switch (resp.data.proceso) {
          case 'PREGUNTAS':
            const question = JSON.stringify(resp.data.procesoPreguntas);
            localStorage.setItem('questions', question);
            this.Btndisabled = false;
            this.conceder();
            this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni +'/' + this.tipo+ '/pregunta']);
            break;
          case 'VALIDAR-OTP':
            this.Btndisabled = false;
            this.conceder();
            this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni +'/' + this.tipo+ '/generarOTP']);
            break;
        }
      }
    }, error => {
      this.Btndisabled = false;
    })
  }

}
