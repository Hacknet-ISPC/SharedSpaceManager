import { Component, effect, inject, computed, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservaService } from '../../../services/reserva.ts';
import { Reserva } from '../../../models/reserva';

@Component({
  selector: 'app-mis-reservas',
  imports: [RouterLink],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css',
})
export class MisReservas implements OnInit {
  private reservaService = inject(ReservaService);

  reservas = signal<Reserva[]>([]);

  // Listas filtradas por estado
  confirmadas = computed(() => this.reservas().filter((r) => r.estado === 'confirmada'));
  pendientes = computed(() => this.reservas().filter((r) => r.estado === 'pendiente'));
  completadas = computed(() => this.reservas().filter((r) => r.estado === 'completada'));

  // Contador del total de reservas
  totalConfirmadas = computed(() => this.confirmadas().length);
  totalPendientes = computed(() => this.pendientes().length);
  totalCompletadas = computed(() => this.completadas().length);
  totalReservas = computed(() => this.reservas().length);

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservaService.obtenerReservas().subscribe({
      next: (data) => this.reservas.set(data),
      error: (err) => console.error('Error al cargar reservas:', err),
    });
  }

  eliminarReserva(id: string): void {
    this.reservaService.eliminarReserva(id).subscribe({
      next: () => {
        console.log('Reserva eliminada:', id);
        this.reservas.update((actual) => actual.filter((r) => r.id !== id));
      },
      error: (err) => console.error('Error al eliminar la reserva:', err),
    });
  }

  constructor() {
    effect(() => {
      console.log('reservas:', this.reservas());
    });
  }
}