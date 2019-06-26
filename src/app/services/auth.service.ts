import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey = 'AIzaSyB3dmx1V6iz-a9UjqK330CjtpEZpm7L-Fs';
  private userToken: string;

  constructor(private http: HttpClient)
  {
    this.readToken();
  }

  login(usuario: UsuarioModel)
  {
    const authData =
    {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post
    (
      `${this.url}/verifyPassword?key=${this.apiKey}`,
      authData
    ).pipe
    (
      map(respuesta =>
        {
          this.saveToken(respuesta['idToken']);
          return respuesta;
        })
    );
  }

  logout()
  {
    localStorage.removeItem('token');
  }

  register(usuario: UsuarioModel)
  {
    const authData =
    {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post
    (
      `${this.url}/signupNewUser?key=${this.apiKey}`,
      authData
    ).pipe
    (
      map(respuesta =>
        {
          this.saveToken(respuesta['idToken']);
          return respuesta;
        })
    );
  }

  saveToken(idToken: string)
  {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    const currentDate = new Date();
    currentDate.setSeconds(3600);
    localStorage.setItem('tokenExpires', currentDate.getTime().toString());
  }

  readToken()
  {
    return this.userToken = (localStorage.getItem('token')) ? localStorage.getItem('token') : '';
  }

  isAutenticated(): boolean
  {
    const tokenExpires = localStorage.getItem('tokenExpires');
    const currentDate = new Date().getTime();

    return this.userToken.length > 2 && currentDate < Number(tokenExpires);
  }
}
