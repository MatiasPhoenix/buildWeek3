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
    }
  }

}
