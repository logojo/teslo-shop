import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {
  private baseurl = environment.baseurl;
  transform( images: string | string[] ): string {

    
    if( typeof images === 'string' ) {
        if( images.startsWith('blob')){   
           return `${images}`;
        }
        return `${this.baseurl}/files/product/${images}`;

    }

    if( images.length === 0 )
        return '/assets/images/no-image.jpg';

    return `${this.baseurl}/files/product/${images[0]}`;
  }

}
