import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from "../../pipes/product-image.pipe";

@Component({
  selector: 'product-corousel',
  imports: [ProductImagePipe],
  templateUrl: './product-corousel.component.html',
  styleUrl: './product-corousel.component.css'
})
export class ProductCorouselComponent implements AfterViewInit {
  images = input.required<string[]>()
  swiperDiv = viewChild.required<ElementRef>('swiperDiv')
  
  ngAfterViewInit(): void {
   const element = this.swiperDiv().nativeElement;

   if( !element) return;

   const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      modules:[
        Navigation,
        Pagination
      ],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
   
  }
}
