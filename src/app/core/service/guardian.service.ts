import { Injectable, EventEmitter, Output } from '@angular/core';
import {BehaviorSubject, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GuardianService {

  public conceder: BehaviorSubject<{acceso: boolean}> = new BehaviorSubject(null);

  constructor() { }

}
