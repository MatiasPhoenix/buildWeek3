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
  allFavorites  : Imovie[]  = [];
  movieWatch    : number    = this.getRandomWatchCount();
  serieWatch    : number    = this.getRandomWatchCount();
  form          : boolean   = false;
  avatarSelect  : boolean   = false;
  avatars       : string[]  = [
    "https://gravatar.com/avatar/2063df7663a53f37cd445728e664f83e?s=200&d=robohash&r=x",
    "https://robohash.org/3a63a534e2193fcca89aede877135086?set=set4&bgset=&size=200x200",
    "https://gravatar.com/avatar/3a63a534e2193fcca89aede877135086?s=200&d=robohash&r=x",
    "https://gravatar.com/avatar/a51763ee45a24d85b9205cbf778235fc?s=200&d=robohash&r=x"
  ];

  constructor(private authSvc : AuthService) {}

  ngOnInit() {
    this.authSvc.getUserById().subscribe(user => {
      this.currentUser = user
      this.loadFavorites();
    })
    this.profilePic = 'https://robohash.org/3a63a534e2193fcca89aede877135086?set=set4&bgset=&size=200x200'
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
    this.nome     = ''
    this.email    = ''
    this.username = ''
  }

  toggleAvatarSelection(): void {
    this.avatarSelect = !this.avatarSelect;
  }

  selectAvatar(avatar: string): void {
    this.profilePic   = avatar;
    this.avatarSelect = false;
  }
}
