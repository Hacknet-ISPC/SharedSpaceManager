import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservaService } from '../../../services/reserva';
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
  completadas = computed(() => this.reservas().filter((r) => r.estado === 'finalizada'));

  // Contadores
  totalConfirmadas = computed(() => this.confirmadas().length);
  totalPendientes = computed(() => this.pendientes().length);
  totalCompletadas = computed(() => this.completadas().length);
  totalReservas = computed(() => this.reservas().length);

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservaService.listar().subscribe({
      next: (data) => this.reservas.set(data),
      error: (err) => console.error('Error al cargar reservas:', err),
    });
  }

  cancelarReserva(id: number): void {
    if (!confirm('¿Querés cancelar esta reserva?')) return;

    this.reservaService.cancelar(id).subscribe({
      next: () => {
        // La reserva queda "cancelada": se saca de las listas visibles
        this.reservas.update((actual) =>
          actual.map((r) => (r.id === id ? { ...r, estado: 'cancelada' } : r)),
        );
      },
      error: (err) => {
        console.error('Error al cancelar la reserva:', err);
        alert(err.error?.error ?? 'No se pudo cancelar la reserva.');
      },
    });
  }
}
