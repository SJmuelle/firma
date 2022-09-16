import { Injectable, EventEmitter, Output } from '@angular/core';
import {BehaviorSubject, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GuardianService {

  public conceder: BehaviorSubject<{acceso: boolean}> = new BehaviorSubject(null);
  public concedeReplay: BehaviorSubject<{accesoReplay: boolean}> = new BehaviorSubject(null);
  public concedePregunta: BehaviorSubject<{accesoPregunta: boolean}> = new BehaviorSubject(null);
  public concedeFinal: BehaviorSubject<{accesoFinal: boolean}> = new BehaviorSubject(null);
  public concedeGenOtp: BehaviorSubject<{accesoGenOtp: boolean}> = new BehaviorSubject(null);
  public concedeNoAprob: BehaviorSubject<{accesoNoAprob: boolean}> = new BehaviorSubject(null);
  public concedeAprob: BehaviorSubject<{accesoAprob: boolean}> = new BehaviorSubject(null);
  public concedeInterna: BehaviorSubject<{accesoInterna: boolean}> = new BehaviorSubject(null);
  public concedeDocu: BehaviorSubject<{accesoDocu: boolean}> = new BehaviorSubject(null);
  public concedeOtpFirma: BehaviorSubject<{accesoOtpFirma: boolean}> = new BehaviorSubject(null);
  public concedeGenFirma: BehaviorSubject<{accesoGenFirma: boolean}> = new BehaviorSubject(null);
  public concedeFinFirma: BehaviorSubject<{accesoFinFirma: boolean}> = new BehaviorSubject(null);

  constructor() { }

}
