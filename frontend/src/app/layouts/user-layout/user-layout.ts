import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css'
})
export class UserLayout {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  cerrarSesion(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
