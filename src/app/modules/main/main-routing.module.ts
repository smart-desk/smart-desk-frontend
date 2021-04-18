import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { CategoryComponent } from './pages/category/category.component';
import { AdvertComponent } from './pages/advert/advert.component';
import { AdvertEditComponent } from './pages/advert-edit/advert-edit.component';
import { AdvertCreateComponent } from './pages/advert-create/advert-create.component';
import { IndexComponent } from './pages/index/index.component';
import { AuthGuard } from '../../shared/services/auth/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { MyAdvertsComponent } from './pages/my-adverts/my-adverts.component';
import { UserComponent } from './pages/user/user.component';
import { ForbiddenComponent } from '../../shared/pages/forbidden/forbidden.component';
import { UnauthorizedComponent } from '../../shared/pages/unauthorized/unauthorized.component';
import { GlobalSearchComponent } from './pages/global-search/global-search.component';

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
                component: IndexComponent,
            },
            {
                path: 'profile',
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        component: ProfileComponent,
                    },
                    {
                        path: 'bookmarks',
                        component: BookmarksComponent,
                    },
                    {
                        path: 'my-adverts',
                        component: MyAdvertsComponent,
                    },
                ],
            },
            {
                path: 'search',
                component: GlobalSearchComponent,
                runGuardsAndResolvers: 'always',
            },
            {
                path: 'user/:id',
                component: UserComponent,
            },
            {
                path: 'adverts/create',
                component: AdvertCreateComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'adverts/:advert_id/edit',
                component: AdvertEditComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'adverts/:advert_id',
                component: AdvertComponent,
            },
            {
                path: 'category/:category_id',
                component: CategoryComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
