import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Gender, Product } from '@products/interfaces/product.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProductCorouselComponent } from '../product-corousel/product-corousel.component';
import { FormUtils } from '@utils/form-utils';
import { ProductsService } from '@products/services/products.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';


@Component({
  selector: 'product-details',
  imports: [ ReactiveFormsModule, ProductCorouselComponent],
  templateUrl: './details.component.html'
})
export class DetailsComponent {

  router = inject( Router );
  #fb = inject( FormBuilder);
  #productoService = inject( ProductsService );

  product = input.required<Product>();
  sizes = ['XS','S', 'M', 'L', 'XL', 'XXL'];
  gender = Gender;
  formUtils = FormUtils;
  tempImages = signal<string[]>([]);
  fileImages: FileList | undefined = undefined;

  imagesToCaroucel = computed(() => {
    return [...this.product().images, ...this.tempImages()];
  });
  


  productForm : FormGroup = this.#fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    slug: ['', [  Validators.required, Validators.pattern(FormUtils.slugPattern) ]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [['']],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],

  });

  productEffect = effect(() => {
    this.productForm.reset(this.product());
  });

  onSizeChange(size: string) {
    const sizes = this.productForm.get('sizes')?.value ?? [];

    if (sizes.includes(size)) {
      this.productForm.patchValue({ sizes: sizes.filter((s: string) => s !== size) });
    } else {
      this.productForm.patchValue({ sizes: [...sizes, size] });
    }
  }

  onFilesChange( event: Event) {
    const files = (event.target as HTMLInputElement).files ?? undefined;
    this.fileImages = files;
    this.tempImages.set([]);
    const temporalyImages = Array.from(files ?? []).map(file => URL.createObjectURL(file));
    this.tempImages.set(temporalyImages);
    
  }


  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    } 

    const formValues = this.productForm.value;

    const productData: Partial<Product> = {
      ...formValues,
      tags: typeof formValues.tags === 'string' 
            ? formValues.tags?.toLowerCase().split(', ').map((tag : string) => tag.trim()) 
            : formValues.tags
    };

    if(this.product().id == 'new') {
          this.#productoService.store( productData,  this.fileImages )
              .subscribe(( product ) => {
                this.router.navigate(['/admin/product', product.id])
                toast.success('Producto creado');
          });
    }else {
      
         this.#productoService.update( this.product().id, productData, this.fileImages )
             .subscribe(() => {
               toast.success('Producto modificado');
          });
    }

  
    
  }
}
