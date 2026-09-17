import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

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

  errorMessage = '';

  // Formulario reactivo para el inicio de sesión
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

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

    this.errorMessage = '';
    const { email, password } = this.loginForm.value;

    // Consulta los usuarios a json-server para verificar credenciales
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        const usuario = usuarios.find(
          (u) =>
            u.email.trim().toLowerCase() === email?.trim().toLowerCase() &&
            u.contraseña === password
        );

        if (!usuario) {
          this.errorMessage = 'Correo o contraseña incorrectos.';
          return;
        }

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
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.errorMessage = 'Error de conexión con el servidor.';
      },
    });
  }
}

