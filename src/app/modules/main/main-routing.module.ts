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
import { SavedComponent } from './pages/saved/saved.component';
import { MyAdvertsComponent } from './pages/my-adverts/my-adverts.component';

const routes: Routes = [
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
                component: ProfileComponent,
            },
            {
                path: 'saved',
                component: SavedComponent,
            },
            {
                path: 'my_adverts',
                component: MyAdvertsComponent,
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
                path: ':category_id',
                component: CategoryComponent,
            },
            {
                path: ':category_id/:advert_id',
                component: AdvertComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
