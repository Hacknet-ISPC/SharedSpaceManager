import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

@Service()
export class UsuarioService  {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/usuarios`

    registrar(usuario: Omit<Usuario, 'id' | 'id_usuario'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }
}
