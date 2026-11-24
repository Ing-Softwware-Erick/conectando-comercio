import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

// Definimos cómo luce un producto
export interface Producto {
  id: string; // Identificador único
  nombre: string;
  precio: number;
  descripcion: string;
  especificaciones: string;
  imagen: string; // Aquí guardaremos la foto en formato Base64
  entregas: string[]; // ['domicilio', 'tienda', 'publico']
  estado: 'borrador' | 'en_cola' | 'publicado'; // Para el RF5 y RF6
  fechaCreacion: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private KEY = 'productos_data';

  constructor(private storage: StorageService) { }

  // Obtener todos los productos
  async obtenerProductos(): Promise<Producto[]> {
    const productos = await this.storage.get(this.KEY);
    return productos || []; // Si no hay nada, devuelve una lista vacía
  }

  // Obtener un solo producto por su ID
  async obtenerProductoPorId(id: string): Promise<Producto | undefined> {
    const productos = await this.obtenerProductos();
    return productos.find(p => p.id === id);
  }

  // Crear un producto nuevo
  async agregarProducto(producto: Producto): Promise<void> {
    const productos = await this.obtenerProductos();
    productos.push(producto);
    await this.storage.set(this.KEY, productos);
  }

  // Actualizar un producto existente (RF4, RF8)
  async actualizarProducto(productoActualizado: Producto): Promise<void> {
    const productos = await this.obtenerProductos();
    const index = productos.findIndex(p => p.id === productoActualizado.id);
    if (index !== -1) {
      productos[index] = productoActualizado;
      await this.storage.set(this.KEY, productos);
    }
  }

  // Eliminar un producto (RF8)
  async eliminarProducto(id: string): Promise<void> {
    let productos = await this.obtenerProductos();
    productos = productos.filter(p => p.id !== id);
    await this.storage.set(this.KEY, productos);
  }

  // Cambiar estado (ej. de 'borrador' a 'en_cola' para el RF6)
  async cambiarEstado(id: string, nuevoEstado: 'borrador' | 'en_cola' | 'publicado'): Promise<void> {
    const producto = await this.obtenerProductoPorId(id);
    if (producto) {
      producto.estado = nuevoEstado;
      await this.actualizarProducto(producto);
    }
  }
}