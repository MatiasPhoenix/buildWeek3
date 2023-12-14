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
  movies: Imovie[] =[
    {
    Title: "Amor de madre",
    Year: "2013",
    imdbID: "tt3000156",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BNzRmNmQwODItM2Y2Zi00MDFiLTk2MzAtYjNjN2MyMTk0YTRmXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg"
    },
    {
    Title:'La madre distratta',
    Type: 'movie',
    Year: '2016',
    Poster:'https://m.media-amazon.com/images/M/MV5BNTBjZTgyZjUtZjk5ZS00NDBmLWI1ZTUtNWJiMmZiMGE0NGVhXkEyXkFqcGdeQXVyMTAxOTY2NTQ@._V1_SX300.jpg',
    imdbID: 'tt7162186',
    },
    {
      Title: "Stage Mother",
      Year: "2020",
      imdbID: "tt8364138",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BODNhYmIzMTAtZWNjYS00NzdmLTkxYzItMmViY2JhMmY3MzcyXkEyXkFqcGdeQXVyNjU2NDIxOTM@._V1_SX300.jpg"
    },
    {
      Title: "La Cicciolina. Godmother of Scandal",
      Year: "2016",
      imdbID: "tt6181534",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BYmEwMzdmZmYtYzM3OS00NTcxLWI3NjYtOTU5ZjliMmU1OGU2XkEyXkFqcGdeQXVyMjMzMTE2MzY@._V1_SX300.jpg"
    },
    {
      Title: "Chicha tu madre",
      Year: "2006",
      imdbID: "tt0778641",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BMmM3ZjM3YWUtYzllZS00YmY1LWFlZmUtNTQ0MGY2ZmQ2ZGU0XkEyXkFqcGdeQXVyNTk0MzkxNDk@._V1_SX300.jpg"
    }
  ]

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
      this.scrollToTop();
    })
  }

  previousPage() {
    this.page--;
    return this.svc.getMovies(this.movie, this.page, this.year, this.type).subscribe(data => {
      this.movies   = [];
      this.movies   = data.Search;
      this.checkMoviesLength();
      this.scrollToTop();
    })
  }

  checkMoviesLength() {
    if (this.movies.length >= 10) {
      this.moviesL = true;
    } else {
      this.moviesL = false;
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
  // getSingleMovie(){
  //   return this.svc.getMovie(this.movie).subscribe(data => console.log(data))
  // }
}
