import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-admin-layout',
  styleUrl: './admin-layout.css',
  templateUrl: './admin-layout.html',
})
export class AdminLayout {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  cerrarSesion(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}
