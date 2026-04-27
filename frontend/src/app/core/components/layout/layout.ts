import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Button } from "primeng/button";
import { DrawerModule } from 'primeng/drawer';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Button, DrawerModule, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  sidebarVisible = signal(false)

  isAdmin = computed(() => this.authService.getRole() === 'admin');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
