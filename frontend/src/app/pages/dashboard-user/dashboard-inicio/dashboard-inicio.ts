import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ReservaService } from '../../../services/reserva';
import { CanchaService } from '../../../services/cancha';
import { Reserva } from '../../../models/reserva';
import { Cancha } from '../../../models/cancha';

@Component({
  selector: 'app-dashboard-user',
  imports: [RouterLink],
  templateUrl: './dashboard-inicio.html',
  styleUrl: './dashboard-inicio.css',
})
export class DashboardInicio implements OnInit {
  private reservaService = inject(ReservaService);
  private canchaService = inject(CanchaService);

  reservas = signal<Reserva[]>([]);
  canchas = signal<Cancha[]>([]);

  // Nombre del usuario: ajustá la clave a la que guarde tu compañero
  usuarioNombre = this.leerNombre();

  private leerNombre(): string {
    try {
      const u = JSON.parse(localStorage.getItem('usuario') ?? 'null');
      return u?.first_name ?? u?.nombre ?? 'Usuario';
    } catch {
      return 'Usuario';
    }
  }

  // Reservas activas (pendientes o confirmadas) desde ahora, ordenadas
  proximasReservas = computed(() => {
    const ahora = new Date();
    return this.reservas()
      .filter((r) => r.estado === 'pendiente' || r.estado === 'confirmada')
      .map((r) => ({
        ...r,
        inicio: new Date(`${r.fecha}T${r.hora_inicio}`),
      }))
      .filter((r) => r.inicio >= ahora)
      .sort((a, b) => a.inicio.getTime() - b.inicio.getTime())
      .map((r) => ({
        id: r.id,
        sala: this.nombreCancha(r.id_cancha),
        horario: `${r.fecha} · ${r.hora_inicio.slice(0, 5)} a ${r.hora_fin.slice(0, 5)}`,
        estado: r.estado,
        tiempoRestante: this.tiempoRestante(r.inicio),
        acento: r.estado === 'confirmada',
      }));
  });

  // Cuántas caen en los próximos 7 días
  reservasSemanalesCount = computed(() => {
    const limite = Date.now() + 7 * 24 * 60 * 60 * 1000;
    return this.proximasReservas().filter(
      (r) => new Date(r.horario.split(' · ')[0]).getTime() <= limite,
    ).length;
  });

  espaciosDisponibles = computed(() =>
    this.canchas()
      .filter((c) => c.estado === 'disponible')
      .map((c) => ({
        id: c.id,
        nombre: `${c.nombre} · ${c.tipo_nombre}`,
        disponibilidad: 'Disponible',
      })),
  );

  ngOnInit(): void {
    this.reservaService.listar().subscribe({
      next: (data) => this.reservas.set(data),
      error: (err) => console.error('Error al cargar reservas:', err),
    });
    this.canchaService.listar().subscribe({
      next: (data) => this.canchas.set(data),
      error: (err) => console.error('Error al cargar canchas:', err),
    });
  }

  private nombreCancha(id: number): string {
    return this.canchas().find((c) => c.id === id)?.nombre ?? `Cancha #${id}`;
  }

  private tiempoRestante(inicio: Date): string {
    const min = Math.round((inicio.getTime() - Date.now()) / 60000);
    if (min < 60) return `En ${min} min`;
    const horas = Math.floor(min / 60);
    if (horas < 24) return `En ${horas} h`;
    const dias = Math.floor(horas / 24);
    return dias === 1 ? 'Mañana' : `En ${dias} días`;
  }
}