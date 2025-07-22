import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { IUser, IUser2, ILogin, IUser3 } from '../Models/Users';
import { environment } from '../../environments/environment';

environment
@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private _http = inject(HttpClient);
  urlApi: string = '';
  controller: string = 'personas/';
  controllerLogin: string = 'login/';
  public userSubject: BehaviorSubject<any>;

  get GetToken() {
    return this.userSubject.value;
  }

  constructor() { 
    this.urlApi = environment.api;
    this.userSubject = new BehaviorSubject<any>(localStorage.getItem('token'));
  }

  login(log: ILogin): Observable<any> {
    return this._http.post<any>(this.urlApi + this.controllerLogin, log).pipe(
      map((res) => {
        const token = res.token;
        console.log(res.token);

        localStorage.setItem('token', token);
        this.userSubject.next(token);
        return true;
      })
    );
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  getUsers(): Observable<any>{
    return this._http.get<IUser>(this.urlApi + this.controller);
  }

  postUsuarios(usuarios: IUser2): Observable<any>{
    return this._http.post<IUser2>(this.urlApi + this.controller, usuarios);
  }

  putUsuarios(idUsuario: number, usuarios: IUser3): Observable<any>{
    return this._http.put(this.urlApi + this.controller + idUsuario, usuarios);
  }

  deleteUser(idUser: number): Observable<any>{
    return this._http.delete(this.urlApi + this.controller + idUser)
  }

}
