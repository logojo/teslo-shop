import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Gender, Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
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

  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts( options : Options ) : Observable<ProductsResponse> {    
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`

    if( this.productsCache.has(key )) {
       return of( this.productsCache.get(key)! );
    }
    
    return this.http.get<ProductsResponse>(`${this.baseurl}/products`, {
                params: { limit, offset, gender }
              }).pipe(
                tap( res => this.productsCache.set(key, res))
              );
  }

   getProductBySlug( idSlug: string ) : Observable<Product> {
    
    if( this.productCache.has( idSlug )) {
       return of( this.productCache.get(idSlug)! );
    }
    
    return this.http.get<Product>(`${this.baseurl}/products/${idSlug}`).pipe(
                tap( res => this.productCache.set(idSlug, res))
              );;
  }
}
