import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _httpClient: HttpClient,) { }


  /**
  * @description: peticion get 
  * @param url: string endpoind
  */
  getQuery(url: string) {
      return this._httpClient.get(url).pipe(catchError(this.handleError));
  }

  /**
  * @description: peticion post 
  * @param url: string endpoind
  * @param data: json a enviar
  */
  postQuery(url: string, data: any) {
    return this._httpClient.post(url, data).pipe(catchError(this.handleError));
  }

  /**
   * @description: para fallas de errores en las peticiones.
   */
  handleError = (err: any): Observable<HttpEvent<any>> => {
    // debugger;
    let errorMessage = 'No hay respuesta, favor intente nuevamente';
    let icon: string = 'question';
    // console.log("Algo se daño");
    let res: any = {};
    if (err.error instanceof ErrorEvent) {
      icon = 'question';
      errorMessage = `Error: ${err.error.msg}`;
    } else {
      switch (err.status) {
        case 401:
          localStorage.clear();
          localStorage.clear();
          setTimeout(() => {
            localStorage.setItem('closeSession', 'true');
          }, 100);
          break;
        case 402:
          localStorage.clear();
          localStorage.clear();
          setTimeout(() => {
            localStorage.setItem('closeSession', 'true');
          }, 100);
          break;
        case 403:
          errorMessage = `No tiene permiso para ejecutar esta acción`;
          break;
        case 400:
          if (err.error.msg == 'La session ha expirado') {
            localStorage.clear();
            localStorage.clear();
            setTimeout(() => {
              localStorage.setItem('closeSession', 'true');
            }, 100);
          }
          if (
            err.error.msg !== undefined &&
            typeof err.error.msg == 'string'
          ) {
            errorMessage = `${err.error.msg}`;
          }
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
    if (err.status !== 401 && err.error !== 'La session ha expirado') {
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

