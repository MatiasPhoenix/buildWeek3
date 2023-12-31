import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  showContainer: boolean = false;

  constructor(
    private router:Router,
    ){}

      ngOnInit(){
      this.cambioPag();
      setTimeout(() => {
        this.showContainer = true;
      }, 1570);
    }

  cambioPag() {
      setTimeout(() => {
        this.router.navigate(['dashboard']);
      }, 6000);
    }

}
