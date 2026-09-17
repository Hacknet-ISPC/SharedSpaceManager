import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario';
import { Usuario } from '../../models/usuario';

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

  registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  get name() {
    return this.registerForm.controls.name;
  }

  get lastname() {
    return this.registerForm.controls.lastname;
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

    const nuevoUsuario: Omit<Usuario, 'id' | 'id_usuario'> = {
      nombre: this.registerForm.value.name!,
      apellido: this.registerForm.value.lastname!,
      email: this.registerForm.value.email!,
      contraseña: this.registerForm.value.password!,
      id_rol: 2,
      fecha_registro: new Date().toISOString().split('T')[0],
    };

    this.usuarioService.registrar(nuevoUsuario).subscribe({
      next: (usuarioCreado) => {
        console.log('Usuario registrado:', usuarioCreado);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
      }
    });

  }


}
