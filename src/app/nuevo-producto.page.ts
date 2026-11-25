import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, 
  IonInput, IonTextarea, IonButton, IonBackButton, IonButtons, IonCheckbox, 
  IonImg, IonIcon, IonNote 
} from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { addIcons } from 'ionicons';
import { cameraOutline, saveOutline } from 'ionicons/icons';

// Definimos la interfaz aquí mismo para evitar errores de rutas
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
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.page.html',
  styleUrls: ['./nuevo-producto.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, 
    IonInput, IonTextarea, IonButton, IonBackButton, IonButtons, IonCheckbox, 
    IonImg, IonIcon, IonNote
  ]
})
export class NuevoProductoPage {
  producto: Producto = {
    id: '',
    nombre: '',
    precio: 0,
    descripcion: '',
    especificaciones: '',
    imagen: '',
    entregas: [],
    estado: 'borrador',
    fechaCreacion: 0
  };

  constructor(private router: Router) {
    addIcons({ cameraOutline, saveOutline });
  }

  // Función para manejar la foto
  cargarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Guardamos la imagen en Base64 para poder guardarla en texto local
        this.producto.imagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Función para los checks de entrega
  toggleEntrega(tipo: string, event: any) {
    if (event.detail.checked) {
      this.producto.entregas.push(tipo);
    } else {
      this.producto.entregas = this.producto.entregas.filter(e => e !== tipo);
    }
  }

  async guardarProducto() {
    if (!this.producto.nombre || this.producto.precio <= 0) {
      alert('El nombre y un precio mayor a 0 son obligatorios');
      return;
    }
    if (this.producto.entregas.length === 0) {
      alert('Debes seleccionar al menos una forma de entrega');
      return;
    }

    // Generamos un ID único, la fecha, y estado inicial
    this.producto.id = Date.now().toString();
    this.producto.fechaCreacion = Date.now();

    // Guardamos en el almacenamiento local
    const { value } = await Preferences.get({ key: 'productos_data' });
    let listaProductos: Producto[] = value ? JSON.parse(value) : [];
    listaProductos.push(this.producto);
    await Preferences.set({ key: 'productos_data', value: JSON.stringify(listaProductos) });

    alert('¡Producto guardado!');
    this.router.navigateByUrl('/dashboard');
  }
}
