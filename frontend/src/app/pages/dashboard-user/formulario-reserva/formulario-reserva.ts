import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ReservaService } from '../../../services/reserva';
import { CanchaService } from '../../../services/cancha';
import { NuevaReserva } from '../../../models/reserva';
import { Cancha } from '../../../models/cancha';

// Duraciones que acepta el backend, en minutos
export const DURACIONES = [
  { minutos: 60, etiqueta: '1 hora' },
  { minutos: 90, etiqueta: '1 hora y media' },
];

function sumarMinutos(hora: string, minutos: number): string {
  const [h, m] = hora.split(':').map(Number);
  const total = h * 60 + m + minutos;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

@Component({
  selector: 'app-formulario-reserva',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-reserva.html',
  styleUrl: './formulario-reserva.css',
})
export class FormularioReserva {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private reservaService = inject(ReservaService);
  private canchaService = inject(CanchaService);

  enviando = signal(false);
  error = signal('');
  hoy = new Date().toLocaleDateString('en-CA');
  duraciones = DURACIONES;

  reservaForm = this.fb.nonNullable.group({
    cancha: ['', Validators.required],
    fecha: ['', Validators.required],
    horaInicio: ['', Validators.required],
    duracion: [60, Validators.required],
  });

  canchas = toSignal(this.canchaService.listar(), {
    initialValue: [] as Cancha[],
  });

  onSubmit() {
    if (this.reservaForm.invalid) {
      this.reservaForm.markAllAsTouched();
      return;
    }

    if (!confirm('¿Estás seguro de que deseas confirmar esta reserva?')) return;

    const { cancha, fecha, horaInicio, duracion } = this.reservaForm.getRawValue();
    const horaFin = sumarMinutos(horaInicio, Number(duracion));

    // Si la reserva cruza la medianoche, el backend no la admite
    if (horaFin <= horaInicio) {
      this.error.set('La reserva no puede terminar después de las 00:00.');
      return;
    }

    const reserva: NuevaReserva = {
      id_cancha: Number(cancha),
      fecha,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
    };

    this.enviando.set(true);
    this.error.set('');

    this.reservaService.crear(reserva).subscribe({
      next: (creada) => {
        this.enviando.set(false);
        this.router.navigate(['/user/confirmacion-reserva'], {
          state: { reserva: creada },
        });
      },
      error: (e: HttpErrorResponse) => {
        this.enviando.set(false);
        this.error.set(this.mensajeDeError(e));
      },
    });
  }

  private mensajeDeError(e: HttpErrorResponse): string {
    if (e.status === 403) return 'Tenés que iniciar sesión para reservar.';
    if (e.status === 400) {
      const err = e.error;
      if (err?.non_field_errors?.length) return err.non_field_errors[0];
      if (Array.isArray(err) && err.length) return err[0];
      const primero = err && Object.values(err)[0];
      if (Array.isArray(primero) && primero.length) return String(primero[0]);
    }
    return 'No se pudo guardar la reserva. Intentá de nuevo.';
  }
}
