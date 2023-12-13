import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Imovie } from './models/imovie';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { iUser } from '../auth/Models/i-user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  movies!       : Imovie[]
  currentUser!  : iUser
  movie         : string                = ''
  page          : number                = 1
  year          : string                = ''
  type          : string                = ''
  moviesL       : boolean               = false
  isFavorite    : {[i:string]:boolean}  = {}

  ngOnInit() {
    this.authSvc.getUserById().subscribe(user => {
      this.currentUser = user
    })
  }

  constructor(
    private svc     : DashboardService,
    private router  : Router,
    private authSvc : AuthService,
    private http    : HttpClient
    ) {}

  getMovies(){
    this.page = 1
    return this.svc.getMovies(this.movie, this.page, this.year, this.type).subscribe(data => {
      this.movies   = [];
      this.movies   = data.Search;
      this.addImageUrl()
      this.checkMoviesLength()
    })
  }

  addImageUrl(){
    this.movies.forEach(movie => {
      if(movie.Poster === "N/A") {
        movie.Poster = "../../../assets/1000_F_315180932_rhiXFrJN27zXCCdrgx8V5GWbLd9zTHHA.jpg"
      }
    })
  }

  nextPage(){
    this.page++;
    this.moviesL = false
    return this.svc.getMovies(this.movie, this.page, this.year, this.type).subscribe(data => {
      this.movies   = [];
      this.movies   = data.Search;
      this.addImageUrl()
      this.checkMoviesLength();
    })
  }

  previousPage() {
    this.page--;
    return this.svc.getMovies(this.movie, this.page, this.year, this.type).subscribe(data => {
      this.movies   = [];
      this.movies   = data.Search;
      this.checkMoviesLength();
    })
  }

  checkMoviesLength() {
    if (this.movies.length >= 10) {
      this.moviesL = true;
    } else {
      this.moviesL = false;
    }
  }
  // getSingleMovie(){
  //   return this.svc.getMovie(this.movie).subscribe(data => console.log(data))
  // }

  addToFavorites(movie: Imovie) {
    if (this.currentUser) {
      if (!this.currentUser.favorites) {
        this.currentUser.favorites = [];
      }
      const isAlreadyFavorite = this.currentUser.favorites.some(fav => {
        fav.imdbID === movie.imdbID
      });

      if (!isAlreadyFavorite) {
        this.currentUser.favorites.push(movie);
        this.authSvc.updateFavorites(this.currentUser).subscribe(res => {
          console.log(res);
        });

        this.isFavorite[movie.imdbID] = true
      }
    }
  }


  removeFromFavorites() {

  }
}
