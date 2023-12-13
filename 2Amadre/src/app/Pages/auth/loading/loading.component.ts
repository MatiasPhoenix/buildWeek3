import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  constructor(
    private router:Router,
    private authSvc:AuthService,
    ){}

    ngOnInit(){
      this.cambioPag();
    }

    cambioPag() {
      setTimeout(() => {
        this.router.navigate(['dashboard']);
      }, 4000);
    }



}
