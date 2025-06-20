import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Gender } from '@products/interfaces/product.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '@auth/interfaces/user.interface';

@Component({
  selector: 'front-navbar',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
 authService = inject( AuthService );

 gender = Gender;
 authStatus = AuthStatus;
}
