import { Component, inject, signal } from '@angular/core';
import { TableComponent } from "../../../products/components/table/table.component";
import { ProductsService } from '../../../products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';

import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/services/pagination.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [ RouterLink, TableComponent, PaginationComponent],
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  productsService = inject( ProductsService );
  paginationService =  inject( PaginationService );


  limit = signal(10);

  products = rxResource({
    request: () => ({ page: this.paginationService.page() -1, limit: this.limit() }),
    loader: ({request}) => this.productsService.getProducts({  offset: request.page * request.limit, limit: request.limit  }),
  });
}
