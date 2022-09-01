import { Injectable } from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import { AppSettingsService } from '../config/app-setting.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class FirmaInternaService {
  
  constructor(private _appSettings: AppSettingsService, private _utilityService: UtilityService) { }
  
  solicitarGenerar(datos: any) {
    return this._utilityService.postQuery(this._appSettings.configuracionInicial.url.solicitudGenerar, datos)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  solicitarValidar(datos: any) {
    return this._utilityService.postQuery(this._appSettings.configuracionInicial.url.solicitudValidar, datos)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  solicitarFirmar(datos: any) {
    return this._utilityService.postQuery(this._appSettings.configuracionInicial.url.solicitudFirmar, datos)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  documentosFirmar(datos: any) {
    return this._utilityService.postQuery(this._appSettings.configuracionInicial.url.documentosFirmar, datos)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  pagare(datos: any){
    return this._utilityService.postQuery(this._appSettings.configuracionInicial.url.mostrarPagare, datos)
      .pipe(map((res: any) => {
        return res;
      }));
  }


}
