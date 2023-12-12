import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imovie } from './models/imovie';
import { Imoviedetails } from './models/imoviedetails';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiKey: string = 'f8f45844';
  //
  constructor(private http:HttpClient) {}

  getMovie(movie: string): Observable<any> {
    const apiUrl=`http://www.omdbapi.com/?t=${movie}&apikey=${this.apiKey}`
    return this.http.get(apiUrl);
  }

  getMovies(movie: string, page: number, year?: string,):Observable<any> {
    const apiUrl=`http://www.omdbapi.com/?s=${movie}&page=${page}&y=${year}&apikey=${this.apiKey}`
    return this.http.get(apiUrl);
  }

  getById(id: string): Observable<Imoviedetails> {
    const apiUrl = `http://www.omdbapi.com/?i=${id}&apikey=${this.apiKey}`
    return this.http.get<Imoviedetails>(apiUrl);
  }

}
