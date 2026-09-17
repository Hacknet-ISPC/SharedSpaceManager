import { Component, effect, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservaService } from '../../../services/reserva.ts';
import { toSignal } from '@angular/core/rxjs-interop';
import { Reserva } from '../../../models/reserva.js';

@Component({
  selector: 'app-mis-reservas',
  imports: [RouterLink],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css',
})
export class MisReservas {
  private reservaService = inject(ReservaService);

  reservas = toSignal(this.reservaService.obtenerReservas(), {
    initialValue: [] as Reserva[],
  });

  // Listas filtradas por estado
  confirmadas = computed(() => this.reservas().filter((r) => r.estado === 'confirmada'));

  pendientes = computed(() => this.reservas().filter((r) => r.estado === 'pendiente'));

  completadas = computed(() => this.reservas().filter((r) => r.estado === 'completada'));

  // Contador del total de reservas
  totalConfirmadas = computed(() => this.confirmadas().length);
  totalPendientes = computed(() => this.pendientes().length);
  totalCompletadas = computed(() => this.completadas().length);
  totalReservas = computed(() => this.reservas().length);

  constructor() {
    effect(() => {
      console.log('reservas:', this.reservas());
    });
  }
}
