import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, 
  IonList, IonItem, IonLabel, IonThumbnail, IonButton, IonIcon 
} from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { addIcons } from 'ionicons';
import { trashOutline, eyeOutline } from 'ionicons/icons';

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  especificaciones: string;
  imagen: string;
  entregas: string[];
  estado: 'borrador' | 'en_cola' | 'publicado';
  fechaCreacion: number;
}

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.page.html',
  styleUrls: ['./mis-productos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, 
    IonList, IonItem, IonLabel, IonThumbnail, IonButton, IonIcon
  ]
})
export class MisProductosPage implements OnInit {
  productos: Producto[] = [];

  constructor() {
    addIcons({ trashOutline, eyeOutline });
  }

  ngOnInit() {
    // No hacemos nada aquí, usamos ionViewWillEnter
  }

  // ESTA ES LA MAGIA: se ejecuta CADA VEZ que entras a la pantalla
  async ionViewWillEnter() {
    await this.cargarProductos();
  }

  async cargarProductos() {
    const { value } = await Preferences.get({ key: 'productos_data' });
    if (value) {
      this.productos = JSON.parse(value);
      this.productos.sort((a, b) => b.fechaCreacion - a.fechaCreacion);
    } else {
      this.productos = [];
    }
  }

  async eliminar(id: string) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productos = this.productos.filter(p => p.id !== id);
      await Preferences.set({ key: 'productos_data', value: JSON.stringify(this.productos) });
    }
  }

  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(precio);
  }
}
