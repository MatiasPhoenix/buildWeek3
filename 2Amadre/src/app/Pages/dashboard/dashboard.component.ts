import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  movies: any[] = []
  movie: string = '';
  constructor(private svc: DashboardService) {}

  test(){
    return this.svc.getMovies(this.movie).subscribe(data => {
      this.movies.push(data.Search)
      console.log(data.Search)
      console.log(this.movies)
    })
  }

  test2(){
    return this.svc.getMovie(this.movie).subscribe(data => console.log(data))
  }
}
