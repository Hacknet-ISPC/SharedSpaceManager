import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { switchMap, throwError } from 'rxjs';
import { ReservaService } from '../../../services/reserva.ts';
import { EspacioService } from '../../../services/espacio.js';
import { Reserva } from '../../../models/reserva';
import { Espacio } from '../../../models/espacio';

// "HH:mm" se puede comparar como string sin problemas
const rangoHorario: ValidatorFn = (group) => {
  const inicio = group.get('horaInicio')?.value;
  const fin = group.get('horaFin')?.value;
  return inicio && fin && fin <= inicio ? { rangoInvalido: true } : null;
};

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
  private espacioService = inject(EspacioService);

  enviando = signal(false);
  error = signal('');
  hoy = new Date().toLocaleDateString('en-CA');

  private readonly idUsuario: number = 1;

  reservaForm = this.fb.nonNullable.group(
    {
      espacio: ['', Validators.required],
      cantidadPersonas: ['', Validators.required],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
    },
    { validators: rangoHorario },
  );

  espacios = toSignal(this.espacioService.obtenerEspacios(), {
    initialValue: [] as Espacio[],
  });

  private espacioId = toSignal(this.reservaForm.controls.espacio.valueChanges, {
    initialValue: '',
  });

  espacioSeleccionado = computed(() =>
    this.espacios().find((e) => e.id_espacio === Number(this.espacioId())),
  );

  onSubmit() {
    if (this.reservaForm.invalid) {
      this.reservaForm.markAllAsTouched();
      return;
    }

    const { espacio, cantidadPersonas, fecha, horaInicio, horaFin } =
      this.reservaForm.getRawValue();

    const capacidad = this.espacioSeleccionado()?.capacidad ?? 0;
    if (Number(cantidadPersonas) > capacidad) {
      this.error.set(`Este espacio admite hasta ${capacidad} personas.`);
      return;
    }

    if (!confirm('¿Estás seguro de que deseas confirmar esta reserva?')) return;

    const reserva: Omit<Reserva, 'id'> = {
      id_usuario: this.idUsuario,
      id_espacio: Number(espacio),
      fecha,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      cantidad_personas: Number(cantidadPersonas),
      estado: 'pendiente',
      id_reserva: 0,
    };

    this.enviando.set(true);
    this.error.set('');

    this.reservaService
      .obtenerPorEspacioYFecha(reserva.id_espacio, reserva.fecha)
      .pipe(
        switchMap((existentes) => {
          const choca = existentes.some(
            (r) =>
              r.estado !== 'cancelada' &&
              reserva.hora_inicio < r.hora_fin &&
              reserva.hora_fin > r.hora_inicio,
          );
          return choca
            ? throwError(() => new Error('solapamiento'))
            : this.reservaService.agregarReserva(reserva);
        }),
      )
      .subscribe({
        next: (creada) => {
          this.enviando.set(false);
          this.router.navigate(['/user/confirmacion-reserva'], {
            state: { reserva: creada },
          });
        },
        error: (e: Error) => {
          this.enviando.set(false);
          this.error.set(
            e.message === 'solapamiento'
              ? 'Ese espacio ya está reservado en ese horario.'
              : 'No se pudo guardar la reserva. Intentá de nuevo.',
          );
        },
      });
  }
}
