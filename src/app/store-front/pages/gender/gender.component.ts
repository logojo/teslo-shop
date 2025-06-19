import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { ProductsService } from '@products/services/products.service';
import { ProductCardComponent } from "@products/components/product-card/product-card.component";

@Component({
  selector: 'app-gender',
  imports: [ProductCardComponent],
  templateUrl: './gender.component.html'
})
export class GenderComponent {
  private route = inject( ActivatedRoute );
  private productsService =  inject( ProductsService );

  gender = toSignal(
    this.route.params.pipe(
      map(({gender}) => gender )
    )
  )

   productsResources = rxResource({
    request: () => ({ gender: this.gender() }), //*al poner parametros aqui estoy al pendiente de que la signal cambie, cal cambiar se dispara nuevamente la peticion
    loader:({ request }) => {
      return this.productsService.getProducts({gender: request.gender })
    }
  });
  

}
