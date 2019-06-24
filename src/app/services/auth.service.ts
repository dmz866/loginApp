import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
  private apiKey = 'AIzaSyB3dmx1V6iz-a9UjqK330CjtpEZpm7L-Fs';

  //CREAR NUEVO USUARIO
  //signupNewUser?key=[API_KEY]

  //LOGIN
  //verifyPassword?key=[API_KEY]

  constructor(private http: HttpClient) { }

  login(usuario: UsuarioModel)
  {

  }

  logout()
  {

  }

  register(usuario: UsuarioModel)
  {

  }
}
