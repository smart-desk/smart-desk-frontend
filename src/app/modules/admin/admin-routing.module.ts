import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateModelComponent } from './pages/create-model/create-model.component';
import { ModelsComponent } from './pages/models/models.component';
import { EditModelComponent } from './pages/edit-model/edit-model.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AdvertsListComponent } from './pages/adverts-list/adverts-list.component';
import { AdminGuard } from '../../services/auth/admin.guard';
import { UsersComponent } from './pages/users/users.component';
import { AdvertsBlockedComponent } from './pages/adverts-blocked/adverts-blocked.component';
import { AdvertsPendingComponent } from './pages/adverts-pending/adverts-pending.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: 'models',
                component: ModelsComponent,
            },
            {
                path: 'models/create',
                component: CreateModelComponent,
            },
            {
                path: 'models/edit/:id',
                component: EditModelComponent,
            },
            {
                path: 'categories',
                component: CategoriesComponent,
            },
            {
                path: 'adverts',
                component: AdvertsListComponent,
            },
            {
                path: 'adverts/blocked',
                component: AdvertsBlockedComponent,
            },
            {
                path: 'adverts/pending',
                component: AdvertsPendingComponent,
            },
            {
                path: 'users',
                component: UsersComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
