import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  productsService =  inject( ProductsService );

  productsResources = rxResource({
    request: () => ({}),
    loader:({ request }) => {
      return this.productsService.getProducts({})
    }
  });
}
