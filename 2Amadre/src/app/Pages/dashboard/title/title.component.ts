import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Imovie } from '../models/imovie';
import { Imoviedetails } from '../models/imoviedetails';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  votiArr:[] = [];
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

  movie : Imoviedetails = {
    Title: '',
    Year: '',
    Rated: '',
    Released: '',
    Runtime: '',
    Genre: '',
    Director: '',
    Writer: '',
    Actors: '',
    Plot: '',
    Language: '',
    Country: '',
    Awards: '',
    Poster: '',
    Ratings: [],
    Metascore: '',
    imdbRating: '',
    imdbVotes: '',
    imdbID: '',
    Type: '',
    DVD: '',
    BoxOffice: '',
    Production: '',
    Website: '',
    Response: ''
  }

  constructor(
    private dSvc    : DashboardService,
    private router  : Router,
    private route   : ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.dSvc.getById(params.id).subscribe(res => {
        this.movie = res;
        console.log(this.movie)

      })
    })

  }


}
