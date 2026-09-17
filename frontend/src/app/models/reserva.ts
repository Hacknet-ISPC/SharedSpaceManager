export interface Reserva {
  id_reserva: number;
  id_usuario: number;
  id_espacio: number;
  fecha: string;
  hora_incio: string;
  hora_fin: string;
  cantidad_personas: number;
  estado: string;
}
