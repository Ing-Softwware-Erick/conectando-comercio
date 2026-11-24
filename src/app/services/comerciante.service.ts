import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export interface Comerciante {
  nombreNegocio: string;
  nombreResponsable: string;
  telefono: string;
  correo: string;
  documento: string;
  infoPago: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComercianteService {
  private KEY = 'comerciante_data';

  constructor(private storage: StorageService) { }

  async guardarComerciante(comerciante: Comerciante): Promise<void> {
    await this.storage.set(this.KEY, comerciante);
  }

  async obtenerComerciante(): Promise<Comerciante | null> {
    return await this.storage.get(this.KEY);
  }

  async estaRegistrado(): Promise<boolean> {
    const data = await this.obtenerComerciante();
    return data !== null;
  }
}