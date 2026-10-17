import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario';
import { LoginPayload } from '../../models/usuario';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  erroresServidor = signal<Record<string, string>>({});
  errorGeneral = signal('');
  enviando = signal(false);

  private camposBackend: Record<string, string> = {
    email: 'email',
    password: 'password',
  };

  // Formulario reactivo para el inicio de sesión
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    // Al editar cualquier campo se limpian los errores que vinieron del servidor
    this.loginForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      if (Object.keys(this.erroresServidor()).length) {
        this.erroresServidor.set({});
      }
      if (this.errorGeneral()) {
        this.errorGeneral.set('');
      }
    });
  }

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    const credenciales: LoginPayload = {
      email: email!.trim(),
      password: password!,
    };

    this.enviando.set(true);
    this.errorGeneral.set('');

    this.usuarioService.login(credenciales).subscribe({
      next: (res) => {
        const usuarioBack = res.usuario;
        // Mapeamos los datos para mantener compatibilidad con el resto de la app
        const usuario = {
          ...usuarioBack,
          id_usuario: usuarioBack.id,
          id_rol: usuarioBack.rol,
          nombre: usuarioBack.first_name,
          apellido: usuarioBack.last_name,
        };

        // Guardar sesión en localStorage
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Redirigir según el rol (1: Admin, 2: Cliente / Usuario)
        if (usuario.id_rol === 1) {
          this.router.navigate(['/admin']);
        } else if (usuario.id_rol === 2) {
          this.router.navigate(['/user']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.enviando.set(false);
        if (err.status === 400 && err.error && typeof err.error === 'object') {
          this.mostrarErroresServidor(err.error);
        } else if (err.status === 0) {
          this.errorGeneral.set('No se pudo conectar con el servidor. Intentá de nuevo en unos minutos.');
        } else {
          this.errorGeneral.set('Ocurrió un error inesperado al iniciar sesión.');
        }
      },
    });
  }

  // Muestra errores de campos o error general si no coincide con ningún campo
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


