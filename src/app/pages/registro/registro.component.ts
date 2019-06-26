import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit()
  {
    this.usuario = new UsuarioModel();
  }

  register(registroForm: NgForm)
  {
    if(registroForm.invalid)
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

    this.auth.register(this.usuario)
    .subscribe
    (
      respuesta =>
      {
        Swal.close();
        this.router.navigateByUrl('/home');
      },
      error =>
      {
        Swal.fire(
          {
            title: 'Error al registrar',
            text: error.error.error.message,
            type: 'error'
          });
      }
    );
  }
}
