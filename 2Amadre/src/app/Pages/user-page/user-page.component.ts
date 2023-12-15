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

  nome!         : string
  email!        : string
  username!     : string
  currentUser!  : iUser
  profilePic!   : string
  allFavorites  : Imovie[]  = []
  movieWatch    : number    = this.getRandomWatchCount();
  serieWatch    : number    = this.getRandomWatchCount();
  form          : boolean   = false;


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

  getRandomWatchCount(){
    const randomIndex = Math.floor(Math.random() * 100);
    return randomIndex
  }

  loadFavorites() {
    this.allFavorites = [];
    if (this.currentUser && this.currentUser.favorites) {
      this.allFavorites = [...this.currentUser.favorites];
      this.allFavorites.splice(3);
    }
  }

  modificaProfilo(){
    this.form = !this.form
  }
  updateData(){
    if(this.nome){
      this.currentUser.nome     = this.nome
    }

    if(this.email){
      this.currentUser.email    = this.email
    }

    if(this.username) {
      this.currentUser.username = this.username
    }

    this.authSvc.updateData(this.currentUser).subscribe()
    this.modificaProfilo()
    this.nome = ''
    this.email = ''
    this.username = ''
  }
}
