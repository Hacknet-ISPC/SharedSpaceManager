import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css'
})
export class UserLayout {}
