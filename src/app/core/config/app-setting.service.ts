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
    url: {
        configuracionExperia: EndPoints.urlBase('api-fintra/api/generic/qry/configuracion-experian/'),
        datosUsuarioEvidente: EndPoints.urlBase('api-evidente/api/evidente/datos-usuario'),
        datosUsuario: EndPoints.urlBase('api-fintra/api/generic/qry/informacion-cliente-evidente/'),
    }
  };
}
