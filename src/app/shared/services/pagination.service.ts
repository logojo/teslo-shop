import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private route = inject( ActivatedRoute );

  page = toSignal(
      this.route.queryParamMap.pipe(
        map( (params)  => ( params.get('page') ? +params.get('page')!  : 1)),
        map( (page) => (isNaN(page) ? 1 : page)),
      ),
      {
        initialValue: 1,
      }
  );
}
