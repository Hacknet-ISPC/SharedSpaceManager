import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Cancha } from '../models/cancha';

@Injectable({ providedIn: 'root' })
export class CanchaService {
  private http = inject(HttpClient);
  private api = `${environment.backendUrl}/canchas/`;

  listar(): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(this.api);
  }

  obtener(id: number): Observable<Cancha> {
    return this.http.get<Cancha>(`${this.api}${id}/`);
  }
}
