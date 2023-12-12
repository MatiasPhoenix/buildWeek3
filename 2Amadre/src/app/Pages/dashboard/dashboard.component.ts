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
  movies!   : Imovie[];
  movie     : string = '';
  year      : string = '';
  page      : number = 1;

  constructor(
    private svc     : DashboardService,
    private router  : Router
    ) {}

  getMovies(){
    return this.svc.getMovies(this.movie, this.page, this.year).subscribe(data => {
      this.movies = []
      console.log(data)
      this.movies = data.Search;
      this.addImageUrl()
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
    return this.svc.getMovies(this.movie, this.page).subscribe(data => {
      this.movies = [];
      this.movies = data.Search;
    })
  }

  previousPage() {
    this.page--;
    return this.svc.getMovies(this.movie, this.page).subscribe(data => {
      this.movies = [];
      this.movies = data.Search;
    })
  }

  test2(){
    return this.svc.getMovie(this.movie).subscribe(data => console.log(data))
  }

}
