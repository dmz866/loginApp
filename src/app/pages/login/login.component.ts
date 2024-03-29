import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import  Swal  from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) { }

  login(loginForm: NgForm)
  {
    if(loginForm.invalid)
    {
      return;
    }

    Swal.fire(
      {
        allowOutsideClick: false,
        text: 'Espere por favor...',
        type: 'info'
      });
    Swal.showLoading();

    this.auth.login(this.usuario)
    .subscribe(
      respuesta =>
      {
        Swal.close();
        if(this.recordarme)
        {
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/home');
      },
      error =>
      {
        Swal.fire(
          {
            title: 'Error al autenticar',
            text: error.error.error.message,
            type: 'error'
          });
      });
  }

  ngOnInit()
  {
    this.usuario = new UsuarioModel();
    if(localStorage.getItem('email'))
    {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

}
