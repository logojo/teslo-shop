import { Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [ RouterLink ],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
 currentPage = input<number>(4)
 pages = input.required<number>();

 activatedPage = linkedSignal<number>(this.currentPage)

 getPagesList = computed(() => {
  return Array.from({ length: this.pages()}, (_, i) => i + 1)
 });
 
}
