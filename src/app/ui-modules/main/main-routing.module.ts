import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../../modules/auth/auth.guard';
import { ForbiddenComponent } from '../../pages/forbidden/forbidden.component';
import { UnauthorizedComponent } from '../../pages/unauthorized/unauthorized.component';
import { AdvertComponent } from './pages/advert/components/advert/advert.component';
import { VkRedirectComponent } from './components/vk-redirect/vk-redirect.component';

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
                path: 'adverts/create',
                loadChildren: () => import('./pages/advert-create/advert-create.module').then(m => m.AdvertCreateModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'adverts/:advert_id/edit',
                loadChildren: () => import('./pages/advert-edit/advert-edit.module').then(m => m.AdvertEditModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'adverts/:advert_id',
                component: AdvertComponent,
            },
            {
                path: 'category/:category_id',
                loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
            },
            {
                path: 'vk/redirect',
                component: VkRedirectComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
