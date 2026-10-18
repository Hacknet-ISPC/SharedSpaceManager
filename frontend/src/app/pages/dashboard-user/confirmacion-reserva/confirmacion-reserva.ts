import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Reserva } from '../../../models/reserva';

@Component({
  selector: 'app-confirmacion-reserva',
  imports: [RouterLink],
  templateUrl: './confirmacion-reserva.html',
  styleUrl: './confirmacion-reserva.css',
})
export class ConfirmacionReserva {
  private router = inject(Router);

  // Se lee una sola vez, mientras se construye el componente
  reserva: Reserva | undefined = this.router.getCurrentNavigation()?.extras.state?.['reserva'];

  get pendiente(): boolean {
    return this.reserva?.estado === 'pendiente';
  }
}
