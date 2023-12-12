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

  constructor(
    private svc     : DashboardService,
    private router  : Router
    ) {}

  getMovies(){
    return this.svc.getMovies(this.movie).subscribe(data => {
      this.movies = [];
      this.movies = data.Search;
      console.log(this.movies[0])
    })
  }

  test2(){
    return this.svc.getMovie(this.movie).subscribe(data => console.log(data))
  }
}
