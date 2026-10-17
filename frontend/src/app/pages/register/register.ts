import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario';
import { RegistroPayload } from '../../models/usuario';

// Validador custom: compara password y confirmPassword
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  // Errores que devuelve el backend, por campo del formulario (ej: { email: 'Ya existe...' })
  erroresServidor = signal<Record<string, string>>({});
  errorGeneral = signal('');
  enviando = signal(false);

  // Correspondencia entre los nombres de campo de Django y los del formulario
  private camposBackend: Record<string, string> = {
    first_name: 'name',
    last_name: 'lastname',
    username: 'username',
    email: 'email',
    password: 'password',
  };

  constructor() {
    // Al editar cualquier campo se limpian los errores que vinieron del servidor
    this.registerForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      if (Object.keys(this.erroresServidor()).length) {
        this.erroresServidor.set({});
      }
    });
  }

  get name() {
    return this.registerForm.controls.name;
  }

  get lastname() {
    return this.registerForm.controls.lastname;
  }

  get username() {
    return this.registerForm.controls.username;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const v = this.registerForm.value;
    const username = v.username?.trim();

    const datos: RegistroPayload = {
      first_name: v.name!,
      last_name: v.lastname!,
      email: v.email!,
      password: v.password!,
      // El username es opcional: si está vacío no se envía y Django usa el email
      ...(username ? { username } : {}),
    };

    this.enviando.set(true);
    this.errorGeneral.set('');

    this.usuarioService.registrar(datos).subscribe({
      next: () => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.enviando.set(false);
        if (err.status === 400 && err.error && typeof err.error === 'object') {
          this.mostrarErroresServidor(err.error);
        } else if (err.status === 0) {
          this.errorGeneral.set('No se pudo conectar con el servidor. Intentá de nuevo en unos minutos.');
        } else {
          this.errorGeneral.set('Ocurrió un error inesperado al registrar el usuario.');
        }
      },
    });
  }

  // Django responde 400 con un objeto así: { email: ["mensaje"], username: ["mensaje"] }
  private mostrarErroresServidor(errores: Record<string, string[] | string>): void {
    const porCampo: Record<string, string> = {};
    for (const [campoBackend, mensajes] of Object.entries(errores)) {
      const texto = Array.isArray(mensajes) ? mensajes.join(' ') : mensajes;
      const campoForm = this.camposBackend[campoBackend];
      if (campoForm) {
        porCampo[campoForm] = texto;
      } else {
        this.errorGeneral.set(texto);
      }
    }
    this.erroresServidor.set(porCampo);
  }
}