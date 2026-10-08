import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/reservas`;

  obtenerReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  agregarReserva(reserva: Omit<Reserva, 'id'>): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  obtenerPorEspacioYFecha(idEspacio: number, fecha: string): Observable<Reserva[]> {
    const params = new HttpParams().set('id_espacio', idEspacio).set('fecha', fecha);
    return this.http.get<Reserva[]>(this.apiUrl, { params });
  }

  eliminarReserva(id: string): Observable<Reserva[]> {
    return this.http.delete<Reserva[]>(`${this.apiUrl}/${id}`);
  }
}
