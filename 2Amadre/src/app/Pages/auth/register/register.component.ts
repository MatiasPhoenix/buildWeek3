import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { iRegister } from '../Models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorMessage!: boolean;

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

  registerData:iRegister = {
    email: '',
    password: '',
    nome: '',
    username: '',
    favorites: []
  }


  save(){
    this.authSvc.signUp(this.registerData)
    .subscribe({
      next:data =>{
        this.router.navigate(['/auth/login'])
      },
      error: error =>{
        this.errorMessage = true;
        this.registerData.username = ''
      }
    })





  }
}
