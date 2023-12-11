import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiKey: string = '';
  //
  constructor(private http:HttpClient) {}

  getMovie(movie: string): Observable<any> {
    const apiUrl=`http://www.omdbapi.com/?apikey=${this.apiKey}&?t=${movie}`
    return this.http.get(apiUrl);
  }
}
