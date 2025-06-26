import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const isAdminGuard: CanMatchFn = async (route, segments) => {
 const authService = inject( AuthService );

 await firstValueFrom( authService.checkStatus() ); 

  if ( authService.user()?.roles.includes('admin') ) 
       return true;
 
 
  return false;
};
