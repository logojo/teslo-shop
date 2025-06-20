import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/services/pagination.service';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private productsService =  inject( ProductsService );
  paginationService =  inject( PaginationService );


  productsResources = rxResource({
    request: () => ({page: this.paginationService.page() -1 }),
    loader:({ request }) => {
      return this.productsService.getProducts({ offset: request.page * 9 })
    }
  });
}
