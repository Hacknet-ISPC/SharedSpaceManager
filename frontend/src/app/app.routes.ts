import { Routes } from '@angular/router';
import { Home } from './pages/home/home'; // Importas tu nuevo componente Home

export const routes: Routes = [
  // Esta línea le dice a Angular: "Cuando la URL sea '/', muestra la vista Home"
  { path: '', component: Home }
];