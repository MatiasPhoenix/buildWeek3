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


  // film speciali 2Amadre
  movies  : Imovie[] =[
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
  // un po' di fantasy e fantascenza
  movies1 : Imovie[] =[
    {
      Title: "Dungeons & Dragons: Honor Among Thieves",
      Year: "2023",
      imdbID: "tt2906216",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg"
    },
    {
      Title: "Dungeons & Dragons",
      Year: "1983-1985",
      imdbID: "tt0085011",
      Type: "series",
      Poster: "https://m.media-amazon.com/images/M/MV5BOWM0MjNkMjEtY2IyNi00ODdmLTk0ODctNjY3YTQzN2Y3N2ZiXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    },
    {
      Title: "Interstellar",
      Year: "2014",
      imdbID: "tt0816692",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
    },
    {
      Title: "2001: A Space Odyssey",
      Year: "1968",
      imdbID: "tt0062622",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BMmNlYzRiNDctZWNhMi00MzI4LThkZTctMTUzMmZkMmFmNThmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
    },
    {
      Title: "Star Wars: Episode IV - A New Hope",
      Year: "1977",
      imdbID: "tt0076759",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg"
    }
  ]
  //altri consigliati random
  movies2  : Imovie[] =[
    {
      "Title": "Blade Runner",
      "Year": "1982",
      "imdbID": "tt0083658",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
    },
    {
      "Title": "Alien",
      "Year": "1979",
      "imdbID": "tt0078748",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOGQzZTBjMjQtOTVmMS00NGE5LWEyYmMtOGQ1ZGZjNmRkYjFhXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"
    },
    {
      "Title": "Mad Max: Fury Road",
      "Year": "2015",
      "imdbID": "tt1392190",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
    },
    {
      "Title": "The Shining",
      "Year": "1980",
      "imdbID": "tt0081505",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      "Title": "The Thing",
      "Year": "1982",
      "imdbID": "tt0084787",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNGViZWZmM2EtNGYzZi00ZDAyLTk3ODMtNzIyZTBjN2Y1NmM1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Night of the Living Dead",
      "Year": "1968",
      "imdbID": "tt0063350",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMzRmN2E1ZDUtZDc2ZC00ZmI3LTkwOTctNzE2ZDIzMGJiMTYzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      "Title": "Psycho",
      "Year": "1960",
      "imdbID": "tt0054215",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNTQwNDM1YzItNDAxZC00NWY2LTk0M2UtNDIwNWI5OGUyNWUxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
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

  // esperimento funzione random film consigliati
  combinedArray = [...this.movies, ...this.movies1, ...this.movies2];
  shuffledArray = this.shuffleAndLimitArray(this.combinedArray, 5);

  shuffleAndLimitArray(array: any[], limit: number): any[] {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];}
    return newArray.slice(0, limit);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
    this.shuffledArray = this.shuffleAndLimitArray(this.combinedArray, 5);
  }
}
