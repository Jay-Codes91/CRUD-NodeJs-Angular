import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DatosService } from '../../Services/datos.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _serLogin = inject(DatosService);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  form!: FormGroup;

  constructor() {
    this.form = this._fb.group({
      nombre: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20)]),
      ],

      pass: ['', Validators.compose([Validators.required])],
    });

    const token = localStorage.getItem('token');

    if (token) {
      this._router.navigate(['/usuarios']);
    }
  }

  login() {
    const user = {
      nombre: this.form.get('nombre')?.value,
      pass: this.form.get('pass')?.value,
    };

    this._serLogin.login(user).subscribe({
      next: (data) => {
        this._router.navigate(['/usuarios']);
      },

      error: (err: HttpErrorResponse) => {
        alert('Usuario o contraseña incorrecta');
      },
    });
  }
}
