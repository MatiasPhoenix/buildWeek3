import { Component } from '@angular/core';
import { iUser } from '../auth/Models/i-user';
import { AuthService } from '../auth/auth.service';
import { Imovie } from '../dashboard/models/imovie';
import { Observable } from 'rxjs';
import { iAccessData } from '../auth/Models/i-access-data';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {

  currentUser!  : iUser
  profilePic!   : string
  username!     : string
  allFavorites  : Imovie[] = []
  allUsernames  : string[] = ['test1', 'prova2', 'tuofiglio', 'testicolo2', 'bigtest5'];
  movieWatch   : number = this.getRandomWatchCount();
  serieWatch   : number = this.getRandomWatchCount();
  form :boolean = false;
  nome!:string
  email!:string

  // currentUser: iUser={
  //   nome
  //   email,
  // }

  constructor(private authSvc : AuthService) {}

  ngOnInit() {
    this.authSvc.getUserById().subscribe(user => {
      this.currentUser = user
      this.loadFavorites();
      this.test()
    })
    this.username = this.getRandomUsername();
    this.profilePic = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp';
  }

  test() {
    console.log(this.currentUser)
    console.log(this.allFavorites)
  }

  getRandomUsername(): string {
    const randomIndex = Math.floor(Math.random() * this.allUsernames.length);
    return this.allUsernames[randomIndex];
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
      this.currentUser.nome = this.nome
    }
    if(this.email){
      this.currentUser.email = this.email
    }
      this.authSvc.updateData(this.currentUser).subscribe()
      this.modificaProfilo()
      this.nome = ''
      this.email = ''
  }
}
