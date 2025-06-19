import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Gender } from '@products/interfaces/product.interface';

@Component({
  selector: 'front-navbar',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
 gender = Gender;
}
