import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.authService.isCsLoggedIn)
    if (this.authService.isCsLoggedIn !== true) {
      window.alert('Access Denied, Login is Required to Access This Page!');
      this.router.navigate(['sign-in']);
      return false
    }
    else{
      return true;
    }

  }
}