import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { ProductsService } from '@products/services/products.service';
import { ProductCardComponent } from "@products/components/product-card/product-card.component";
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/services/pagination.service';

@Component({
  selector: 'app-gender',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender.component.html'
})
export class GenderComponent {
  private route = inject( ActivatedRoute );
  private productsService =  inject( ProductsService );
  paginationService =  inject( PaginationService );

  gender = toSignal(
    this.route.params.pipe(
      map(({gender}) => gender )
    )
  )

   productsResources = rxResource({
    request: () => ({ gender: this.gender(), page: this.paginationService.page() -1 }), //*al poner parametros aqui estoy al pendiente de que la signal cambie, cal cambiar se dispara nuevamente la peticion
    loader:({ request }) => {
      return this.productsService.getProducts({offset: request.page * 9,  gender: request.gender })
    }
  });
  

}
