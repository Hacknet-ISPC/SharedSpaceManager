import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva, NuevaReserva } from '../models/reserva';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private http = inject(HttpClient);
  private api = `${environment.backendUrl}/reservas/`;

  listar(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.api);
  }

  crear(reserva: NuevaReserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.api, reserva);
  }

  cancelar(id: number): Observable<Reserva> {
    return this.http.patch<Reserva>(`${this.api}${id}/cancelar/`, {});
  }
}
