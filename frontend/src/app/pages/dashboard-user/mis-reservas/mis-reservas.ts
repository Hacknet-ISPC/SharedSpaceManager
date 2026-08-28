import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ReservaItem {
  id: number;
  sala: string;
  detalle: string;
  icono: string;
}

@Component({
  selector: 'app-mis-reservas',
  imports: [RouterLink],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css'
})
export class MisReservas {
  estadisticas = {
    confirmadas: 2,
    pendientes: 2,
    completadas: 8,
    total: 12
  };

  reservasConfirmadas: ReservaItem[] = [
    {
      id: 1,
      sala: 'Sala de Creatividad',
      detalle: 'Jueves 14 de Mayo • 15:00 – 17:00 • Piso 3, Sala A',
      icono: 'bi-palette'
    },
    {
      id: 2,
      sala: 'Estación de Trabajo 08',
      detalle: 'Viernes 15 de Mayo • 09:00 – 18:00 • Piso 2, Open Space',
      icono: 'bi-laptop'
    }
  ];

  reservasPendientes: ReservaItem[] = [
    {
      id: 3,
      sala: 'Cabina de Zoom',
      detalle: 'Lunes 19 de Mayo • 10:00 – 11:00 • Piso 1, Cabina B',
      icono: 'bi-camera-video'
    },
    {
      id: 4,
      sala: 'Sala Lounge',
      detalle: 'Martes 20 de Mayo • 14:00 – 16:00 • Piso 1, Lounge',
      icono: 'bi-chat-square-heart'
    }
  ];

  cancelarReserva(id: number, tipo: 'confirmada' | 'pendiente') {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      if (tipo === 'confirmada') {
        this.reservasConfirmadas = this.reservasConfirmadas.filter(r => r.id !== id);
        this.estadisticas.confirmadas--;
      } else {
        this.reservasPendientes = this.reservasPendientes.filter(r => r.id !== id);
        this.estadisticas.pendientes--;
      }
      this.estadisticas.total--;
    }
  }
}
