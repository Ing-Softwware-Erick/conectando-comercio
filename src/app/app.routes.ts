import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'registro', pathMatch: 'full' },
  { path: 'registro', loadComponent: () => import('./registro.page').then( m => m.RegistroPage) },
  { path: 'dashboard', loadComponent: () => import('./dashboard.page').then( m => m.DashboardPage) },
  { path: 'nuevo-producto', loadComponent: () => import('./nuevo-producto.page').then( m => m.NuevoProductoPage) },
  { path: 'mis-productos', loadComponent: () => import('./mis-productos.page').then( m => m.MisProductosPage) },
  { path: 'detalle-producto/:id', loadComponent: () => import('./detalle-producto.page').then( m => m.DetalleProductoPage) }
];
