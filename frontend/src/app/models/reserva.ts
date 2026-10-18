export interface Reserva {
  id: number;
  id_usuario: number;
  id_cancha: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado: string;
}

export interface NuevaReserva {
  id_cancha: number;
  fecha: string; // "2026-10-30"
  hora_inicio: string; // "20:00"
  hora_fin: string; // "21:00"
}
