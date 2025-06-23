import { Component, effect, inject, input } from '@angular/core';
import { Gender, Product } from '@products/interfaces/product.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProductCorouselComponent } from '../product-corousel/product-corousel.component';
import { FormUtils } from '@utils/form-utils';


@Component({
  selector: 'product-details',
  imports: [ ReactiveFormsModule, ProductCorouselComponent],
  templateUrl: './details.component.html'
})
export class DetailsComponent {

  product = input.required<Product>();
  sizes = ['XS','S', 'M', 'L', 'XL', 'XXL'];
  gender = Gender;
  formUtils = FormUtils;
  
  #fb = inject( FormBuilder);

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

  console.log('Product Data:', productData);
  
    
  }
}
