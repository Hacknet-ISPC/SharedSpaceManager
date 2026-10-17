import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroPayload, RegistroRespuesta, Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/usuarios`;
  private backUrl = `${environment.backendUrl}/usuarios`;

  // Registra un nuevo usuario en la base de datos simulada
  // registrar(usuario: Omit<Usuario, 'id' | 'id_usuario'>): Observable<Usuario> {
  //   return this.http.post<Usuario>(this.apiUrl, usuario);
  // }

  registrar(datos: RegistroPayload): Observable<RegistroRespuesta>{
    return this.http.post<RegistroRespuesta>(`${this.backUrl}/registro/`, datos);
  }

  // Obtiene el listado de usuarios para validación de credenciales y gestión
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}
