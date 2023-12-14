import { Component } from '@angular/core';
import { iUser } from '../auth/Models/i-user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {

currentUser! : iUser

constructor(private authSvc : AuthService) {}

ngOnInit() {
  this.authSvc.getUserById().subscribe(user => {
    this.currentUser = user
  })
}

}
