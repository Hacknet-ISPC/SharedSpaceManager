export interface Cancha {
  id: number;
  nombre: string;
  superficie: string;
  descripcion: string;
  estado: string; // 'disponible' | 'mantenimiento'
  tipo: number;
  tipo_nombre: string;
  cantidad_jugadores: number;
}
