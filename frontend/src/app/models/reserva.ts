export interface Reserva {
  id_usuario: number;
  id_espacio: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  cantidad_personas: number;
  estado: string;
}
