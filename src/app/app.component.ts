import { Router } from '@angular/router';
import { AuthService } from 'src/app/server-connection/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    public router: Router,
    public authService: AuthService
    ) {}

}
