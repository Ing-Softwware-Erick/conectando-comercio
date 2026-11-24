import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Guarda cualquier dato (objetos, listas, etc.)
  async set(clave: string, valor: any): Promise<void> {
    await Preferences.set({
      key: clave,
      value: JSON.stringify(valor)
    });
  }

  // Lee un dato guardado
  async get(clave: string): Promise<any> {
    const { value } = await Preferences.get({ key: clave });
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  // Elimina un dato específico
  async remove(clave: string): Promise<void> {
    await Preferences.remove({ key: clave });
  }

  // Limpia toda la memoria de la app
  async clear(): Promise<void> {
    await Preferences.clear();
  }
}