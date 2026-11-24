import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonList, IonItem, IonLabel, IonInput, IonButton 
} from '@ionic/angular';

// 1. Traemos el almacenamiento local
import { Preferences } from '@capacitor/preferences';

// 2. DEFINIMOS LA INTERFAZ Y EL SERVICIO AQUÍ MISMO (adiós errores de rutas)
export interface Comerciante {
  nombreNegocio: string;
  nombreResponsable: string;
  telefono: string;
  correo: string;
  documento: string;
  infoPago: string;
}

@Injectable({ providedIn: 'root' })
export class ComercianteServiceLocal {
  private KEY = 'comerciante_data';
  async guardar(comerciante: Comerciante) {
    await Preferences.set({ key: this.KEY, value: JSON.stringify(comerciante) });
  }
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonList, IonItem, IonLabel, IonInput, IonButton
  ]
})
export class RegistroPage {
  comerciante: Comerciante = {
    nombreNegocio: '',
    nombreResponsable: '',
    telefono: '',
    correo: '',
    documento: '',
    infoPago: ''
  };

  constructor(
    private comercianteService: ComercianteServiceLocal,
    private router: Router
  ) {}

  async guardar() {
    if (this.comerciante.nombreNegocio && this.comerciante.telefono) {
      await this.comercianteService.guardar(this.comerciante);
      alert('¡Guardado con éxito!');
      // Por ahora no redirigimos a ninguna parte porque el dashboard no existe aún
    } else {
      alert('Por favor completa los campos obligatorios (Nombre del negocio y Teléfono)');
    }
  }
}