import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';

import { AuthService } from '@auth/services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject( AuthService );
  const router = inject( Router );

  
  return next(req).pipe(
    catchError((error: HttpErrorResponse ) => {
      
      if( error.status === 400 ) {
     
        if( typeof error.error.message == 'string'){
            toast.error( error.error.message );

        }else {
          const errors = error.error.message.length ?? 0;
  
          for (let i = 0; i < errors; i++) {
              toast.error(error.error.message[i])
          }
        }
     
        
      }

      if( error.status === 500 ) {
         toast.error('error inesperado');
      }

      //todo: mover esta logica al authInterceptor
       if( error.status === 401 ) {
          toast.error(error.error.message);
          
           //todo: validar si la ruta es login no redireccionar
          authService.logout();
          router.navigate(['/auth/login']);
       }
      return throwError(() => error.error.message )
    })
  );
};
