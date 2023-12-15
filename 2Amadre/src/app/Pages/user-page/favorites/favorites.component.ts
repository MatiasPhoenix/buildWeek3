import { Component } from '@angular/core';
import { Imovie } from '../../dashboard/models/imovie';
import { iUser } from '../../auth/Models/i-user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

  currentUser!  : iUser
  allFavorites  : Imovie[] = []
  isFavorite    : {[i:string]:boolean}  = {}

  constructor(private authSvc : AuthService) {}

  ngOnInit() {
    this.authSvc.getUserById().subscribe(user => {
      this.currentUser = user
      this.loadFavorites();
    })
  }

  loadFavorites() {
    this.allFavorites = [];
    if (this.currentUser && this.currentUser.favorites) {
      this.allFavorites = [...this.currentUser.favorites];
      this.currentUser.favorites.forEach(fav => {
        this.isFavorite[fav.imdbID] = true;
      })
    }
  }

  removeFromFavorites(movie:Imovie) {
    if (this.currentUser) {
      if (!this.currentUser.favorites) {
        this.currentUser.favorites = [];
      }
      const isAlreadyFavorite = this.currentUser.favorites.some(fav => {
        fav.imdbID === movie.imdbID
      });

      if (!isAlreadyFavorite) {
       let x = this.currentUser.favorites.indexOf(movie);

       this.currentUser.favorites.splice(x,1);

        this.authSvc.updateFavorites(this.currentUser).subscribe(res => {
          console.log(res);
        });

        this.loadFavorites()
        this.isFavorite[movie.imdbID] = false
      }
    }
  }
}
