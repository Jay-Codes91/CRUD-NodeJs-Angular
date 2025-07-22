import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { DatosService } from '../Services/datos.service';

@Injectable(
  { providedIn: 'root' }
)

class AuthGuard{

  private _serLogin = inject(DatosService);
  private _router = inject(Router);
  
   Access(route: ActivatedRouteSnapshot){
    const user = this._serLogin.GetToken;

    if(user){
      return true;
    }
    this._router.navigate(['/login']);
    return false;
   }
   
}

export const Guard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthGuard).Access(route);
};
