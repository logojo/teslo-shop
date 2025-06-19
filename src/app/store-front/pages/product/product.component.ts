import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { ProductsService } from '@products/services/products.service';
import { ProductCorouselComponent } from "../../../products/components/product-corousel/product-corousel.component";

@Component({
  selector: 'app-product',
  imports: [ProductCorouselComponent],
  templateUrl: './product.component.html'
})
export class ProductComponent {
  private productsService =  inject( ProductsService );
  private router = inject( ActivatedRoute );

  idSlug = this.router.snapshot.params['idSlug'];

  productResourse = rxResource({
    request: () => ({ idSlug: this.idSlug }),
    loader: ({ request }) =>  this.productsService.getProductBySlug( request.idSlug )
  })

}
