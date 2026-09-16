import { Component, inject, effect } from '@angular/core';
import { DesarrolladorService } from '../../services/desarrollador';
import { toSignal } from '@angular/core/rxjs-interop';
import { Desarrollador } from '../../models/desarrollador';

@Component({
  imports: [],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About {
  private desarrolladorService = inject(DesarrolladorService);
  desarrolladores = toSignal(this.desarrolladorService.getAll(), {
    initialValue: [] as Desarrollador[],
  });
  constructor() {
    effect(() => {
      console.log('desarrolladores:', this.desarrolladores());
    });
  }
}
