import { Component } from '@angular/core';
import { iUser } from '../auth/Models/i-user';
import { AuthService } from '../auth/auth.service';
import { Imovie } from '../dashboard/models/imovie';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {

  currentUser!  : iUser
  profilePic!   : string
  allFavorites  : Imovie[] = []
  allUsernames  : string[] = ['test1', 'prova2', 'tuofiglio', 'testicolo2', 'bigtest5'];

  constructor(private authSvc : AuthService) {}

  ngOnInit() {
    this.authSvc.getUserById().subscribe(user => {
      this.currentUser = user
      this.loadFavorites();
      this.test()
    })
    this.profilePic = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
  }

  test() {
    console.log(this.currentUser)
    console.log(this.allFavorites)
  }

  loadFavorites() {
    this.allFavorites = [];
    if (this.currentUser && this.currentUser.favorites) {
      this.allFavorites = [...this.currentUser.favorites];
      this.allFavorites.splice(3);
    }
  }
}
