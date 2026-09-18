// espacio.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Espacio } from '../models/espacio';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EspacioService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/espacios`;

  obtenerEspacios(): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(this.apiUrl);
  }
}
