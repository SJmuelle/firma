import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AppSettingsService } from '../config/app-setting.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentLoginService {

  constructor(private _appSettings: AppSettingsService,
    private _utilityService: UtilityService) { }

  /**
  * @description: Get documentos requeridos
  */
  configuracionInicial(datos: any) {
    const { unidadNegocio } = datos;
    return this._utilityService.getQuery(this._appSettings.configuracionInicial.url.datosUsuarioEvidente + unidadNegocio)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  /**
   * @description: Get documentos requeridos
   */
  datosUsuario(documento: string,unidadNegocio:string) {

    // const { documento } = datos;
    return this._utilityService.getQuery(this._appSettings.configuracionInicial.url.datosUsuario + documento+'/'+unidadNegocio)
      .pipe(map((res: any) => {
        return res;
      }));
  }

    /**
     * @description: Get documentos requeridos
     */
     datosUsuarioEvidente(datos: any) {
      return this._utilityService.postQuery(this._appSettings.configuracionInicial.url.datosUsuarioEvidente, datos)
        .pipe(map((res: any) => {
          return res;
        }));
    }

    archivosThomas(datos: any){
      return this._utilityService.postQuery(this._appSettings.configuracionInicial.url.usuarioEvidenteNo, datos)
        .pipe(map((res: any) => {
          return res;
        }));
    }
}
