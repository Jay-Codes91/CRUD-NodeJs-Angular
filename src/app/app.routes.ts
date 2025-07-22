import { Routes } from '@angular/router';
import { Guard } from './Security/auth.guard';

export const routes: Routes = [

    {
        path: 'login',
        loadComponent: () => import('./Components/login/login.component').then(c => c.LoginComponent)
    },

    {
        path: 'usuarios',
        loadComponent: () => import('./Components/usuarios/usuarios.component').then(c => c.UsuariosComponent),
        canActivate: [Guard]
    },

    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
