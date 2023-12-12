import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { iLogin } from '../Models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage!: string;

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

  loginData:iLogin = {
    email: 'mario@rossi.it',
    password: 'password'
  }

  saveLogin(){
    this.authSvc.login(this.loginData)
    .subscribe({
      next:data => {
        this.router.navigate(['/dashboard']);
    },
    error: error => {
      console.error('Errore durante il login:', error);
        this.errorMessage = '0'
        console.log(this.errorMessage);
      }
    })
  }
}
