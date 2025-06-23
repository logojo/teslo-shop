import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [ RouterOutlet, RouterLink, RouterLinkActive ],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  #authService = inject( AuthService );

  user = computed(() => this.#authService.user());


  onLogout() {
    this.#authService.logout();
  }
}
