import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Desarrollador } from '../models/desarrollador';

@Injectable({
  providedIn: 'root',
})
export class DesarrolladorService {
  private apiUrl = 'http://localhost:3000/desarrolladores';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Desarrollador[]> {
    return this.http.get<Desarrollador[]>(this.apiUrl);
  }
}
