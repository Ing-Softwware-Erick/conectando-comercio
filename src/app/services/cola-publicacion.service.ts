import { Injectable, NgZone } from '@angular/core';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class ColaPublicacionService {
  private intervaloId: any;
  // 10 minutos = 600,000 milisegundos. 
  // (Cámbialo a 10000 si quieres probar que funciona cada 10 segundos)
  private TIEMPO_ESPERA = 600000; 

  constructor(
    private productoService: ProductoService,
    private ngZone: NgZone
  ) {}

  // Iniciar el proceso en segundo plano
  iniciarCola() {
    if (this.intervaloId) return; // Si ya está corriendo, no hacer nada

    this.intervaloId = setInterval(() => {
      this.procesarCola();
    }, this.TIEMPO_ESPERA);
  }

  // Detener el proceso
  detenerCola() {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
      this.intervaloId = null;
    }
  }

  // Lógica que revisa y actualiza los productos
  private async procesarCola() {
    const productos = await this.productoService.obtenerProductos();
    const enCola = productos.filter(p => p.estado === 'en_cola');

    if (enCola.length > 0) {
      // Tomamos el primero de la cola (para publicar de a uno)
      const productoAPublicar = enCola[0];
      
      // Lo pasamos a 'publicado'
      await this.productoService.cambiarEstado(productoAPublicar.id, 'publicado');
      
      // NgZone obliga a Angular a actualizar la pantalla si está abierta
      this.ngZone.run(() => {
        console.log(`Producto publicado automáticamente: ${productoAPublicar.nombre}`);
      });
    }
  }
}