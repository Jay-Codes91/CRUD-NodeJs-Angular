import { Component, inject, OnInit } from '@angular/core';
import { IUser, IUser2, IUser3} from '../../Models/Users';
import { Router } from '@angular/router';
import { DatosService } from '../../Services/datos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {

  users: IUser[] = [];
  private _router = inject(Router);
  private _serDatos = inject(DatosService);
  private _fb = inject(FormBuilder);
  form: FormGroup;
  soloLetras: string = '^[A-Za-z\u00C0-\u017F]+$';
  soloNumeros: string = '^[0-9]+$';
  idUser!: number;
  contrasena!: string;

  constructor(){
    this.form = this._fb.group({
      nombre: [
        '',
        Validators.compose([
          Validators.required, 
          Validators.maxLength(20),
          Validators.pattern(this.soloLetras)
        ]),
      ],
      apellido: [
        '',
        Validators.compose([
          Validators.required, 
          Validators.maxLength(20),
          Validators.pattern(this.soloLetras)
        ]),
      ],
      edad: [
        '',
        Validators.compose([
          Validators.required, 
          Validators.pattern(this.soloNumeros)
        ]),
      ],
      rol: [
        '',
        Validators.compose([
          Validators.required, 
          Validators.maxLength(20),
          Validators.pattern(this.soloLetras)
        ]),
      ],
      pass: [''],
    })
  }

  ngOnInit(): void {
    this.getUsuario();
  }

  
  getUsuario(){
    this._serDatos.getUsers().subscribe({
      next: data => {
        this.users = data;
        console.log(data);
        
      },

      error: (err: HttpErrorResponse) => {
        console.log(err.message);
        
      }
    })
  }

  btnAddUser(){
    this.form.reset();
  }

  postUsers(){
    const usuarios: IUser2 = {
       nombre: this.form.get('nombre')?.value,
       apellido: this.form.get('apellido')?.value,
       edad: this.form.get('edad')?.value,
       rol: this.form.get('rol')?.value,
       pass: 'PoJuib00x-'
    }

    console.log(usuarios);

    this._serDatos.postUsuarios(usuarios).subscribe({
      next: (data) => {
        this.getUsuario();
        this.form.reset();
        Swal.fire({
          title: 'Usuario agregado exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'rgb(43, 127, 255)',
        });
      },

      error: (err: HttpErrorResponse) => {
        Swal.fire({
          title: 'No se pudo agregar el usuario',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'rgb(43, 127, 255)',
        });
        
      }
    })
    
  }

  deleteUsuario(idUsuario: number){
    Swal.fire({
      icon: 'question',
      title: '¿Deseas quitar este usuario del sistema?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      confirmButtonColor: 'rgb(43, 127, 255)',
      denyButtonText: 'No',
      denyButtonColor: 'rgb(251, 44, 54)',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this._serDatos.deleteUser(idUsuario).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Usuario eliminado exitosamente del sistema',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: 'rgb(43, 127, 255)',
            });
            this.getUsuario();
          },

          error: (err: HttpErrorResponse) => {
            Swal.fire({
              title: 'No se pudo eliminar el usuario del sistema, ' + err,
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: 'rgb(43, 127, 255)',
            });
          }
        })
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Petición cancelada',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'rgb(43, 127, 255)',
        });
      }
    });
  }

  modUsuario(idUsuario: number, usuario: any){

    this.idUser = idUsuario;
    this.contrasena = usuario.pass;

    console.log(idUsuario);
    console.log(usuario);
    
    this.form.patchValue({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      edad: usuario.edad,
      rol: usuario.rol
    })
  }

  putUsers(){
    const usuarios = {
       id: this.idUser,
       nombre: this.form.get('nombre')?.value,
       apellido: this.form.get('apellido')?.value,
       edad: this.form.get('edad')?.value,
       rol: this.form.get('rol')?.value,
       pass: this.contrasena
    }

    this._serDatos.putUsuarios(this.idUser, usuarios).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Cambios hechos correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'rgb(43, 127, 255)',
        });
        this.getUsuario();
      },

      error: (err: HttpErrorResponse) => {
        Swal.fire({
          title: 'No se pudo actualizar el usuario',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'rgb(43, 127, 255)',
        });
      }
    })
  }

  logOut(){
    this._serDatos.logOut();
    this._router.navigate(['/login'])
  }
}
