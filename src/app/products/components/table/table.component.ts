import { Component, input } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from "../../pipes/product-image.pipe";
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'products-table',
  imports: [ProductImagePipe, RouterLink, CurrencyPipe],
  templateUrl: './table.component.html'
})
export class TableComponent {
  products = input.required<Product[]>();
}
