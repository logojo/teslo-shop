import { Routes } from "@angular/router";
import { LayoutComponent } from "./layouts/layout/layout.component";
import { ProductsComponent } from "./pages/products/products.component";
import { isAdminGuard } from "@auth/guards/is-admin.guard";
import { ProductComponent } from "./pages/product/product.component";


const adminRoutes : Routes = [
    {
        path: '',
        component: LayoutComponent,
        canMatch:[ isAdminGuard ],
        children: [
            {
                path: 'products',
                component: ProductsComponent
            },
            {
                path: 'product/:id',
                component: ProductComponent
            },
            {
                path: '**',
                redirectTo: 'products'
            },
        ]
    }
];

export default adminRoutes;