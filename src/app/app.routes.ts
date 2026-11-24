import { Routes } from '@angular/router';
import { ComercianteService } from './services/comerciante.service'; // <--- Importamos el servicio aquí

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full',
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro.page').then( m => m.RegistroPage)
  }
];