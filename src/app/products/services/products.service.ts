import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { Gender, Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';


interface Options {
  limit?: number;
  offset?: number;
  gender?: Gender
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User 
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

  getProductById( id: string ) : Observable<Product> {

    if( id === 'new' ) {
      return of( emptyProduct )
    }
    
    if( this.productCache.has( id )) {
       return of( this.productCache.get(id)! );
    }
    
    return this.http.get<Product>(`${this.baseurl}/products/${id}`).pipe(
                tap( res => this.productCache.set(id, res))
              );
  }

  store( product: Partial<Product>) : Observable<Product> {
    return this.http.post<Product>(`${this.baseurl}/products`, product ).pipe(
      tap( product => this.updateProductCache(product, false) )
    );
  }
  update(id: string, product: Partial<Product>) : Observable<Product> {
    return this.http.patch<Product>(`${this.baseurl}/products/${id}`, product ).pipe(
      tap( product => this.updateProductCache(product) )
    );
  }

  updateProductCache( product: Product, update =  true  ) {
    this.productCache.set(product.id, product);

    
    //* Solo se ejecuta en la actualización ya que en la creacion no se encuentra encuentra el articulo en cache
    if( update ) {
      this.productsCache.forEach( productRespose => {

        productRespose.products = productRespose.products.map((currectProducto) => {
        return  currectProducto.id === product.id
          ? product
          : currectProducto
        })
      });
    }

  }
}
