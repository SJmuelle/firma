import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilityEvidenteService {
  configuracionInicial:any;
  datosUsuario:any;

  constructor(private _httpClient: HttpClient) { 
    this.configuracionInicial = JSON.parse(localStorage.getItem('configuracionInicial'));
    this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));

  }

  /**
  * @description: peticion get 
  * @param url: string endpoind
  */
  readToken() {
    let token: any;
    if (this.validateToken()) {
      return (token = localStorage.getItem('tokenExperian'));
    } else {
      return (token = '');
    }
  }

  /**
  * @description: peticion get 
  * @param url: string endpoind
  */
  validateToken(): boolean {
    if (localStorage.getItem('accessToken')) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * @description: peticion get 
  * @param url: string endpoind
  */
  getSession(param: string) {
    return localStorage.getItem(param);
  }






  loginData() {
    let optiones = {
      Authorization: 'Basic MG9hMTdpYXJxdW02WWJ0UjYwaDg6Y2p5VDBtTGRuNEI5UE9ldTRTQ1pGdnUwMDhQLVZxSlVCODBjbGJBZg==',
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    let url = 'https://experian-latamb.oktapreview.com/oauth2/ausdbwi7pes71n0hU0h7/v1/token?grant_type=password&username=2-802022016.1@demo.datacredito.com.co&password=F1ntr42022&scope=expco_evidente_master';
    let data = "";
    const headers = new HttpHeaders(optiones);
    return this._httpClient
      .post(url, data, { headers })
      .pipe(catchError(this.handleError));
  }



  /**
   * @description: para fallas de errores en las peticiones.
   */
  handleError = (err: any): Observable<HttpEvent<any>> => {
    let errorMessage = 'No hay respuesta, favor intente nuevamente';
    let icon: string = 'question';
    let res: any = {};
    if (err.error instanceof ErrorEvent) {
      icon = 'question';
      errorMessage = `Error: ${err.error.msg}`;
    } else {
      switch (err.status) {
        case 401:
          break;
        case 402:
         
          break;
        case 403:
          
          break;
        case 400:
          
          
          break;
        case 404:
          errorMessage = `${err.error.msg}`;
          break;
        case 500:
          errorMessage = `${err.error.msg}`;
          break;
        default:
          errorMessage = `${err.statusText.msg}`;
          break;
      }
    }
    if (err.error !== 'La session ha expirado') {
      if (
        errorMessage != 'undefined' &&
        errorMessage !== undefined &&
        errorMessage != null &&
        errorMessage != '' &&
        errorMessage != 'UNKNOWN ERROR!'
      ) {
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Cerrar',
        }).then();
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No hubo respuesta por parte del servidor, favor intente nuevamente',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        }).then();
      }
    }
    return throwError(errorMessage);
  };

}
