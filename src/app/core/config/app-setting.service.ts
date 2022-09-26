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
      datosUsuarioEvidente: EndPoints.urlBase('api-fintra/api/evidente/datos-usuario'),
      datosUsuario: EndPoints.urlBase('api-fintra/api/generic/qry/informacion-cliente-evidente/'),
      usuarioEvidenteNo: EndPoints.urlBase('api-fintra/api/credito/archivos-thomas'),
      generarOtp: EndPoints.urlBase('api-fintra/api/evidente/generar-otp'),
      validarOtp: EndPoints.urlBase('api-fintra/api/evidente/validar-otp'),
      enviarPreguntas: EndPoints.urlBase('api-fintra/api/evidente/verificar-preguntas'),
      solicitudGenerar: EndPoints.urlBase('api-fintra/api/firma/solicitud-generar-otp'),
      solicitudValidar: EndPoints.urlBase('api-fintra/api/firma/solicitud-validar-otp'),
      solicitudFirmar: EndPoints.urlBase('api-fintra/api/firma/solicitud-generar-firma'),
      documentosFirmar: EndPoints.urlBase('api-fintra/api/firma/obtener_documentos_firma'),
      mostrarPagare: EndPoints.urlBase('api-fintra/api/deceval/firmar-pagare-general'),
      validarProceso: EndPoints.urlBase('api-fintra/api/generic/qry/flujo-firma/')
    }
  };
}
