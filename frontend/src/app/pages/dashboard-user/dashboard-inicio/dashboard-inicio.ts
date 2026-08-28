import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ProximaReserva {
  id: number;
  sala: string;
  horario: string;
  tiempoRestante: string;
  acento: boolean;
}

interface EspacioDisponible {
  id: number;
  nombre: string;
  disponibilidad: string;
}

@Component({
  selector: 'app-dashboard-inicio',
  imports: [RouterLink],
  templateUrl: './dashboard-inicio.html',
  styleUrl: './dashboard-inicio.css'
})
export class DashboardInicio {
  usuarioNombre: string = 'Usuario';
  reservasSemanalesCount: number = 2;

  proximasReservas: ProximaReserva[] = [
    {
      id: 1,
      sala: 'Sala de Creatividad',
      horario: 'Jueves, 14 de Mayo • 15:00 - 17:00',
      tiempoRestante: 'En 2 días',
      acento: false
    },
    {
      id: 2,
      sala: 'Estación de Trabajo 08',
      horario: 'Viernes, 15 de Mayo • 09:00 - 18:00',
      tiempoRestante: 'En 3 días',
      acento: true
    }
  ];

  espaciosDisponibles: EspacioDisponible[] = [
    {
      id: 1,
      nombre: 'Cabina de Zoom',
      disponibilidad: '● Disponible ahora'
    },
    {
      id: 2,
      nombre: 'Sala Lounge',
      disponibilidad: '● 4 asientos libres'
    }
  ];
}
