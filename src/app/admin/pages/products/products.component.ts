import { Component, inject, signal } from '@angular/core';
import { TableComponent } from "../../../products/components/table/table.component";
import { ProductsService } from '../../../products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';

import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/services/pagination.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [FormsModule, TableComponent, PaginationComponent],
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  productsService = inject( ProductsService );
  paginationService =  inject( PaginationService );


  limit = signal(5);

  products = rxResource({
    request: () => ({ page: this.paginationService.page() -1, limit: this.limit() }),
    loader: ({request}) => this.productsService.getProducts({  offset: request.page * request.limit, limit: request.limit  }),
  });
}
