import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iRegister } from './Models/register';
import { iAccessData } from './Models/i-access-data';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { iLogin } from './Models/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { iUser } from './Models/i-user';
import { Imovie } from '../dashboard/models/imovie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper:JwtHelperService  = new JwtHelperService()
  authSubject                 = new BehaviorSubject<iAccessData|null>(null);
  user$       = this.authSubject.asObservable();//contiene i dati dell'utente loggato oppure null
  isLoggedIn$ = this.user$.pipe(map(user => !!user))//fornisce true o false in base allo stato di autenticaziuone dell'utente
  //isLoggedIn$ = this.user$.pipe(map(user => Boolean(user)))

  constructor(
    private http:HttpClient,
    private router:Router
  ) {

    this.restoreUser()

  }

  registerUrl     : string     = environment.apiUrl + '/register';
  loginUrl        : string     = environment.apiUrl + '/login'
  userUrl         : string     = environment.apiUrl + '/users'
  allUsernames    : string[]   = ['test1', 'prova2', 'tuofiglio', 'testicolo2', 'bigtest5'];


  signUp(data:iRegister):Observable<iAccessData>{
    if (data.username === '') {
      data.username = this.assignRandomUsername();
    }
    return this.http.post<iAccessData>(this.registerUrl, data)
  }

  login(data:iLogin):Observable<iAccessData>{
    return this.http.post<iAccessData>(this.loginUrl, data)
    .pipe(tap(data => {

      this.authSubject.next(data)
      localStorage.setItem('accessData',JSON.stringify(data))
      this.autoLogout(data.accessToken)
    }))
  }

  autoLogout(jwt:string){
    const expDate = this.jwtHelper.getTokenExpirationDate(jwt) as Date;
    const expMs = expDate.getTime() - new Date().getTime();

    setTimeout(()=>{
      this.logout()
    },expMs)
  }

  logout(){
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/auth/logout']);
  }

  restoreUser(){

      const userJson:string|null =  localStorage.getItem('accessData');
      if(!userJson) return;

      const accessData:iAccessData = JSON.parse(userJson);
      if(this.jwtHelper.isTokenExpired(accessData.accessToken)) return;

      this.autoLogout(accessData.accessToken)
      this.authSubject.next(accessData)
  }

  getUserById(): Observable<any> {
    const accessData: iAccessData | null = this.authSubject.getValue();
    if (!accessData) {
      return new Observable();
    }
    return this.http.get<iUser[]>(this.userUrl).pipe(
      map(users => users.find(user => user.id === accessData.user.id))
    );
  }

  updateData(user: iUser): Observable<iUser> {
    const accessData: iAccessData | null = this.authSubject.getValue();
    if (!accessData) {
      return new Observable();
    }

    const favoritesUpdate = {
      email: user.email,
      nome: user.nome
    }

    const url = `${this.userUrl}/${accessData.user.id}`;
    return this.http.patch<iUser>(url, favoritesUpdate)
      .pipe(tap(updatedUser => {
        this.authSubject.next({ ...accessData, user: updatedUser });
        localStorage.setItem('accessData', JSON.stringify({ ...accessData, user: updatedUser }));
      }));
  }

  updateFavorites(user: iUser): Observable<iUser> {
    const accessData: iAccessData | null = this.authSubject.getValue();
    if (!accessData) {
      return new Observable();
    }

    const favoritesUpdate = {
      favorites: user.favorites
    }

    const url = `${this.userUrl}/${accessData.user.id}`;
    return this.http.patch<iUser>(url, favoritesUpdate)
      .pipe(tap(updatedUser => {
        this.authSubject.next({ ...accessData, user: updatedUser });
        localStorage.setItem('accessData', JSON.stringify({ ...accessData, user: updatedUser }));
      }));
  }

  assignRandomUsername() {
    const randomIndex = Math.floor(Math.random() * this.allUsernames.length);
    const randomNum   = Math.floor(Math.random() * 9999)
    return this.allUsernames[randomIndex] + randomNum;
  }
}

