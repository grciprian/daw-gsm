import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._authService.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this._authService.getLoggedUserToken()}`,
          'Content-Type': `application/json`
        }
      });
    }
    return next.handle(request);
  }

}
