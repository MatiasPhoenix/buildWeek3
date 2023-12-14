import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Imovie } from './models/imovie';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient} from '@angular/common/http';
import { iUser } from '../auth/Models/i-user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  currentUser!  : iUser
  movie         : string                = ''
  page          : number                = 1
  year          : string                = ''
  type          : string                = ''
  moviesL       : boolean               = false
  isFavorite    : {[i:string]:boolean}  = {}

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

  ngOnInit() {
    this.authSvc.getUserById().subscribe(user => {
      this.currentUser = user
      this.loadFavorites();
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
    this.svc.getMovies(this.movie, this.page, this.year, this.type).subscribe(data => {
      this.movies   = [];
      this.movies   = data.Search;
      this.addImageUrl()
      this.checkMoviesLength()
      this.loadFavorites()
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

  loadFavorites() {
    if(this.currentUser && this.currentUser.favorites) {
      this.currentUser.favorites.forEach(fav => {
        this.isFavorite[fav.imdbID] = true;
      })
    } else
    return;
  }

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

        this.isFavorite[movie.imdbID] = false
      }
    }
  }
}
