import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const authRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [  
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

export default authRoutes;
