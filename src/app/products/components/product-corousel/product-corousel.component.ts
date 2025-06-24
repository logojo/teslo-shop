import {  AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, input,  OnInit, } from '@angular/core';

import { SwiperContainer, register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
register();


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from "../../pipes/product-image.pipe";

@Component({
  selector: 'product-corousel',
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [ProductImagePipe],
  templateUrl: './product-corousel.component.html',
  styleUrl: './product-corousel.component.css'
})
export class ProductCorouselComponent implements AfterViewInit  {
 
  images = input.required<string[]>()
  public swiper!: SwiperContainer | null;
  
  ngAfterViewInit(): void {
    this.swiperInit();
  }

  swiperInit() {
    const swiperContructor = document.querySelector('swiper-container');
    const swiperOption: SwiperOptions = {
      slidesPerView: 1,
      pagination: true,
      loop: true,
      autoplay: true,
      navigation: {
        enabled: true,        
      },
    };

    Object.assign( swiperContructor!, swiperOption);
    this.swiper = swiperContructor as SwiperContainer;
    this.swiper.initialize();
  
  }


}
