import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate {

  existe:boolean;

  // soli: string = this.activeroute.snapshot.paramMap.get('num')
  // uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(private router: Router, private activeroute: ActivatedRoute) {}

  retorno(solicitud:string, unidad:string){
    this.router.navigate(['documentLogin'+ '/' + solicitud + '/' + unidad]); 
  }

  page404(){
    this.router.navigate(['documentLogin/page404']); 
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = localStorage.getItem('accessToken');
    const soli = localStorage.getItem('solicitud');
    const uni = localStorage.getItem('unidad');

    if (token==null) {
      this.existe = false;
      console.log(this.existe);
      this.retorno(soli, uni);
    }else{
      this.existe = true;
      if (soli==null && uni==null) {
        this.page404()
      }
    }

    return true;
  }
  
}
