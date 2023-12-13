import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  showContainer: boolean = false;

  constructor(
    private router:Router,
    ){}

    ngOnInit(){
      this.cambioPag();
      setTimeout(() => {
        this.showContainer = true;
      }, 1600);
    }

    cambioPag() {
      setTimeout(() => {
        this.router.navigate(['auth']);
      }, 6000);
    }

}
