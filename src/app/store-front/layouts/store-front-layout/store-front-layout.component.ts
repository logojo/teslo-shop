import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/nabvar.component";

@Component({
  selector: 'app-store-front-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './store-front-layout.component.html'
})
export class StoreFrontLayoutComponent {

}
