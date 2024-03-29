import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../../modules/auth/auth.guard';
import { ForbiddenComponent } from '../../pages/forbidden/forbidden.component';
import { UnauthorizedComponent } from '../../pages/unauthorized/unauthorized.component';
import { VkRedirectComponent } from './components/vk-redirect/vk-redirect.component';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';

const routes: Routes = [
    {
        path: 'forbidden',
        component: ForbiddenComponent,
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
    },
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule),
            },
            {
                path: 'profile',
                canActivate: [AuthGuard],
                loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
            },
            {
                path: 'search',
                loadChildren: () => import('./pages/global-search/global-search.module').then(m => m.GlobalSearchModule),
                runGuardsAndResolvers: 'always',
            },
            {
                path: 'user/:id',
                loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
            },
            {
                path: 'products/create',
                loadChildren: () => import('./pages/product-create/product-create.module').then(m => m.ProductCreateModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'products/:product_id/edit',
                loadChildren: () => import('./pages/product-edit/product-edit.module').then(m => m.ProductEditModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'products/:product_id',
                loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
            },
            {
                path: 'category/:category_id',
                loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
            },
            {
                path: 'vk/redirect',
                component: VkRedirectComponent,
            },
            {
                path: 'site-pages/:id',
                loadChildren: () => import('./pages/site-page/site-page.module').then(m => m.SitePageModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
