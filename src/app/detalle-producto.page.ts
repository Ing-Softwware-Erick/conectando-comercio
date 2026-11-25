import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, 
  IonButton, IonIcon, IonItem, IonLabel, IonList, IonImg, IonBadge, IonText
} from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { addIcons } from 'ionicons';
import { cloudUploadOutline, shareSocialOutline } from 'ionicons/icons';

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
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, 
    IonButton, IonIcon, IonItem, IonLabel, IonList, IonImg, IonBadge, IonText
  ]
})
export class DetalleProductoPage implements OnInit {
  producto: Producto | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {
    addIcons({ cloudUploadOutline, shareSocialOutline });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const { value } = await Preferences.get({ key: 'productos_data' });
      if (value) {
        const lista: Producto[] = JSON.parse(value);
        this.producto = lista.find(p => p.id === id);
      }
    }
  }

  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(precio);
  }

  async subirACola() {
    if (this.producto) {
      // Cambiamos el estado a 'en_cola'
      const { value } = await Preferences.get({ key: 'productos_data' });
      if (value) {
        let lista: Producto[] = JSON.parse(value);
        const index = lista.findIndex(p => p.id === this.producto!.id);
        if (index !== -1) {
          lista[index].estado = 'en_cola';
          await Preferences.set({ key: 'productos_data', value: JSON.stringify(lista) });
          this.producto.estado = 'en_cola';
          alert('¡Producto enviado a la cola de publicación (RF5)!');
        }
      }
    }
  }
}
