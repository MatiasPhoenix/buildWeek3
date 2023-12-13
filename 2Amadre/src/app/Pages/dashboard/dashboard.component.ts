import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Imovie } from './models/imovie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  movies!   : Imovie[]
  movie     : string    = ''
  page      : number    = 1
  year      : string    = ''
  type      : string    = ''
  moviesL   : boolean   = false

  constructor(
    private svc     : DashboardService,
    private router  : Router
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
}
