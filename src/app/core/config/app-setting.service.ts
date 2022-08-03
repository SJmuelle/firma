import { Injectable } from '@angular/core';
import { EndPoints } from './end-points';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  /**
   * @description: End-point auth
   */
  public auth = {
    url: {
      base: EndPoints.urlBase('api-fintra/api/private/iniciar-sesion'),
    }
  };

  /**
   * @description: End-point simulador
  */
  public configuracionInicial = {
    // url: {
    //     configuracionExperia: EndPoints.urlBase('api-fintra/api/generic/qry/configuracion-experian/'),
    //     datosUsuarioEvidente: EndPoints.urlBase('api-evidente/api/evidente/datos-usuario'),
    //     datosUsuario: EndPoints.urlBase('api-fintra/api/generic/qry/informacion-cliente-evidente/'),
    //     usuarioEvidenteNo: EndPoints.urlBase('api-fintra/api/credito/archivos-thomas'),
    //     generarOtp: EndPoints.urlBase('api-evidente/api/evidente/generar-otp'),
    //     validarOtp: EndPoints.urlBase('api-evidente/api/evidente/validar-otp'),
    //     enviarPreguntas: EndPoints.urlBase('api-evidente/api/evidente/verificar-preguntas')
    // }

    url: {
      configuracionExperia: EndPoints.urlPrueba('api-fintra/api/generic/qry/configuracion-experian/'),
      datosUsuarioEvidente: EndPoints.urlPrueba('api-fintra/api/evidente/datos-usuario'),
      datosUsuario: EndPoints.urlBase('api-fintra/api/generic/qry/informacion-cliente-evidente/'),
      usuarioEvidenteNo: EndPoints.urlPrueba('api-fintra/api/credito/archivos-thomas'),
      generarOtp: EndPoints.urlPrueba('api-fintra/api/evidente/generar-otp'),
      validarOtp: EndPoints.urlPrueba('api-fintra/api/evidente/validar-otp'),
      enviarPreguntas: EndPoints.urlPrueba('api-fintra/api/evidente/verificar-preguntas')
    }
  };
}
