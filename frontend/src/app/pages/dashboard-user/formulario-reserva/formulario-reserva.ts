import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-reserva',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-reserva.html',
  styleUrl: './formulario-reserva.css'
})
export class FormularioReserva {
  reservaForm: FormGroup;

  salas: string[] = [
    'Cabina de Zoom',
    'Sala Lounge',
    'Sala de Creatividad',
    'Estación de Trabajo 08'
  ];

  capacidades: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  horariosDisponibles: string[] = ['15:40', '16:00', '17:00', '17:35'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.reservaForm = this.fb.group({
      espacio: ['', [Validators.required]],
      cantidadPersonas: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]]
    });
  }

  seleccionarHora(hora: string) {
    this.reservaForm.patchValue({ hora });
    this.reservaForm.get('hora')?.markAsTouched();
  }

  onSubmit() {
    if (this.reservaForm.valid) {
      if (confirm('¿Estás seguro de que deseas confirmar esta reserva?')) {
        this.router.navigate(['/user/confirmacion-reserva']);
      }
    } else {
      this.reservaForm.markAllAsTouched();
    }
  }
}
