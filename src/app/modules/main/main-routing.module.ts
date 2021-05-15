import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../../services/auth/auth.guard';
import { ForbiddenComponent } from '../../pages/forbidden/forbidden.component';
import { UnauthorizedComponent } from '../../pages/unauthorized/unauthorized.component';

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
                loadChildren: () => import('./modules/index/index.module').then(m => m.IndexModule),
            },
            {
                path: 'profile',
                canActivate: [AuthGuard],
                loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
            },
            {
                path: 'search',
                loadChildren: () => import('./modules/global-search/global-search.module').then(m => m.GlobalSearchModule),
                runGuardsAndResolvers: 'always',
            },
            {
                path: 'user/:id',
                loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
            },
            {
                path: 'adverts/create',
                loadChildren: () => import('./modules/advert-create/advert-create.module').then(m => m.AdvertCreateModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'adverts/:advert_id/edit',
                loadChildren: () => import('./modules/advert-edit/advert-edit.module').then(m => m.AdvertEditModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'adverts/:advert_id',
                loadChildren: () => import('./modules/advert/advert.module').then(m => m.AdvertModule),
            },
            {
                path: 'category/:category_id',
                loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
