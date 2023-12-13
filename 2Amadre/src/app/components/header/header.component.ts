import { AuthService } from './../../Pages/auth/auth.service';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { iLogin } from '../../Pages/auth/Models/login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  login:boolean = true;

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}


  ngOnInit(){
    this.authSvc.isLoggedIn$.subscribe(logged => this.login = logged);
  }
     saveLogout(){
      this.authSvc.logout()
    }


  }
