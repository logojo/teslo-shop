import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
        canMatch:[ notAuthenticatedGuard ]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes'),
    },
    {
        path: '',
        loadChildren: () => import('./store-front/store-front.routes')
    }
];
