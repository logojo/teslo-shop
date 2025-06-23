import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';
import { DetailsComponent } from "../../../products/components/details/details.component";

@Component({
  selector: 'app-product',
  imports: [DetailsComponent],
  templateUrl: './product.component.html'
})
export class ProductComponent {
   #productsService = inject(ProductsService);
   activatedRoute = inject( ActivatedRoute ); 
   router = inject( Router );

   productId = toSignal(
    this.activatedRoute.params.pipe(
     map(params => params['id'] )
    ),
    { initialValue: null }
   )

   product = rxResource({
    request: () => ({ productId: this.productId() }),
    loader: ({ request })=> this.#productsService.getProductById(request.productId),
   });

   redirectEffect = effect(() => {
     if( this.product.error() )
         this.router.navigate(['/admin/products'])
   });
}  
