import { AuthService } from './../server-connection/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.getLoggedUserRoles() && this._authService.getLoggedUserRoles().includes(next.data.role)) {
      return true;
    }

    // navigate to not found page
    this._router.navigate(['/not-found']);
    return false;

  }

}
