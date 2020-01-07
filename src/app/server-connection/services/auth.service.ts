import { AppUser } from './../models/app-user';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as defaultData from '../../shared/config.json';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public login(loginForm: LoginForm): Observable<AppUser> {
    return this.httpClient.post<AppUser>(
      defaultData.backendUrl + '/account/login',
      loginForm
    ).pipe(
      tap(user => {
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
      })
    );
  }

  public logout() {
    sessionStorage.removeItem("loggedUser");
    this.router.navigate(['/']);
  }

  public register(registerForm: RegisterForm): Observable<AppUser> {
    return this.httpClient.post<AppUser>(
      defaultData.backendUrl + '/account/register',
      registerForm
    );
  }

  getLoggedUser(): AppUser {
    return JSON.parse(sessionStorage.getItem('loggedUser')) as AppUser;
  }

  public getLoggedUserPhoneNumber(): string {
    const sessionAppUser = this.getLoggedUser();
    if (sessionAppUser) {
      return sessionAppUser.phoneNumber;
    }
    return "";
  }

  public getLoggedUserUsername(): string {
    const sessionAppUser = this.getLoggedUser();
    if (sessionAppUser) {
      return sessionAppUser.userName;
    }
    return "";
  }

  public getLoggedUserRoles(): Array<string> {
    const sessionAppUser = this.getLoggedUser();
    if (sessionAppUser) {
      return sessionAppUser.roles;
    }
    return [];
  }

  public getLoggedUserToken(): string {
    const sessionAppUser = this.getLoggedUser();
    if (sessionAppUser) {
      return sessionAppUser.token;
    }
    return '';
  }

  public isAuthenticated(): boolean {
    return Boolean(this.getLoggedUserToken()).valueOf();
  }

  public isAdmin(): boolean {
    const sessionAppUser = this.getLoggedUser();
    if (sessionAppUser) {
      return sessionAppUser.roles.includes('ADMIN');
    }
    return false;
  }

  public isEmployee(): boolean {
    const sessionAppUser = this.getLoggedUser();
    if (sessionAppUser) {
      return sessionAppUser.roles.includes('EMPLOYEE');
    }
    return false;
  }

  public isCustomer(): boolean {
    const sessionAppUser = this.getLoggedUser();
    if (sessionAppUser) {
      return sessionAppUser.roles.includes('CUSTOMER');
    }
    return false;
  }

}
