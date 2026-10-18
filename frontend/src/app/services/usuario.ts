import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import {
  LoginPayload,
  LoginRespuesta,
  RegistroPayload,
  RegistroRespuesta,
  Usuario,
} from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/usuarios`;
  private backUrl = `${environment.backendUrl}/usuarios`;

  registrar(datos: RegistroPayload): Observable<RegistroRespuesta> {
    return this.http.post<RegistroRespuesta>(`${this.backUrl}/registro/`, datos);
  }

  login(datos: LoginPayload): Observable<LoginRespuesta> {
    return this.http.post<LoginRespuesta>(`${this.backUrl}/login/`, datos);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.backUrl}/logout/`, {}).pipe(
      finalize(() => {
        localStorage.removeItem('usuario');
      }),
    );
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}
