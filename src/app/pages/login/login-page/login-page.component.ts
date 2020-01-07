import { AppUser } from './../../../server-connection/models/app-user';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/server-connection/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitLoginForm() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    } as LoginForm)
      .subscribe(
        (response: AppUser) => {
          console.log(response);
          if (this.authService.isAdmin()) {
            this.router.navigate(['/admin']);
          } else if (this.authService.isEmployee()) {
            this.router.navigate(['/employee']);
          } else if (this.authService.isCustomer()) {

            this.router.navigate(['/customer']);
          }
        },
        error => console.log(error)
      );
  }

}
