import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Gender, Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


interface Options {
  limit?: number;
  offset?: number;
  gender?: Gender
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject( HttpClient );
  private baseurl = environment.baseurl;

  getProducts( options : Options ) : Observable<ProductsResponse> {    
    const { limit = 9, offset = 0, gender = '' } = options;
    
    return this.http.get<ProductsResponse>(`${this.baseurl}/products`, {
                params: { limit, offset, gender }
              });
  }

   getProductBySlug( idSlug: string ) : Observable<Product> {
    return this.http.get<Product>(`${this.baseurl}/products/${idSlug}`);
  }
}
