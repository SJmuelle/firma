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
    // if (this.concedido!=true) {
    //   this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
    // }
    this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    if (this.idRUL != this.datosUsuario.identificacion) {
      this.router.navigate(['documentLogin']);
    }
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  concederAccesoReplay(){
    this.acceso = true;
    this.guardia.concedeReplay.next({accesoReplay: this.acceso})
  }

  concederAccesoPregunta(){
    this.acceso = true;
    this.guardia.concedePregunta.next({accesoPregunta: this.acceso})
  }

  concederAccesoFinal(){
    this.acceso = true;
    this.guardia.concedeFinal.next({accesoFinal: this.acceso})
  }

  concederAccesoOtp(){
    this.acceso = true;
    this.guardia.concedeGenOtp.next({accesoGenOtp: this.acceso})
  }

  seguir() {
    this.Btndisabled = true;
    let evidente = this.datosUsuario.aplicaEvidente;

    if (evidente == 'Si') {
      let data = {
        "identificacion": this.datosUsuario.identificacion,
        "unidadNegocio": parseInt(this.uni)
      }
      this._documentLoginService.datosUsuarioEvidente(data).subscribe(resp => {
        if (resp.data == 400) {
          this.Btndisabled = false;
        } else {
          if (resp.data.status == 400) {
            localStorage.setItem('ERROR', resp.data.mensaje);
            this.Btndisabled = false;
            this.concederAccesoReplay();
            this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/replay']);
            return;
          } else {
            switch (resp.data.proceso) {
              case 'PREGUNTAS':
                const question = JSON.stringify(resp.data.procesoPreguntas);
                localStorage.setItem('questions', question);
                this.Btndisabled = false;
                this.concederAccesoPregunta();
                this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/pregunta']);
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

        }
      }, error => {
        this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
      })
    } else {
      let data = {
        "unidadNegocio": parseInt(this.uni),
        "numeroSolicitud": parseInt(this.soli)
      }
      this._documentLoginService.archivosThomas(data).subscribe(resp => {
        if (resp.data.status == 400) {
          localStorage.setItem('ERROR', resp.data.mensaje);
          this.concederAccesoReplay();
          this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/replay']);
          return;
        } else {
          this.concederAccesoFinal();
          this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/finalizado']);
        }
        this.Btndisabled = false;
      })
    }
  }

  generarOTP(): void {
    const response = JSON.parse(localStorage.getItem('datosOtp'));

    const data: any = {
      "identificacion": this.datosUsuario.identificacion,
      "unidadNegocio": parseInt(this.uni),
      "infoValidar": response.infoValidar,
      "infoIniOTP": response.infoIniOTP,
      "infoToken": response.infoToken
    };

    this._documentLoginService.generarOTP(data).subscribe(resp => {
      console.log(resp)
      if (resp.data.status == 400) {
        if (resp.data.proceso == 'Lo sentimos no hay mas intentos disponibles.') {
          Swal.fire(
            'Aviso',
            resp.data.proceso,
            'error'
          )
          this.Btndisabled = false;
          this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
        } else {
          this.Btndisabled = false;
          this.concederAccesoReplay();
          this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/replay']);
        }
      } else {
        switch (resp.data.proceso) {
          case 'PREGUNTAS':
            const question = JSON.stringify(resp.data.procesoPreguntas);
            localStorage.setItem('questions', question);
            this.Btndisabled = false;
            this.concederAccesoPregunta();
            this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/pregunta']);
            break;
          case 'VALIDAR-OTP':
            this.Btndisabled = false;
            this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/generarOTP']);
            break;
        }
      }
    })
  }

}
