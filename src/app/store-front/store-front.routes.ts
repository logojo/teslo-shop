import { Routes } from "@angular/router";
import { StoreFrontLayoutComponent } from "./layouts/store-front-layout/store-front-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { GenderComponent } from "./pages/gender/gender.component";
import { ProductComponent } from "./pages/product/product.component";

const storeFrontRoutes: Routes = [
    {
        path: '',
        component: StoreFrontLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'gender/:gender',
                component: GenderComponent
            },
            {
                path: 'product/:idSlug',
                component: ProductComponent
            },
            {
                path: '**',
                loadComponent: () => import('./pages/not-found/not-found.component') 
            },

        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

export default storeFrontRoutes;
