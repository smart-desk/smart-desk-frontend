import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateModelComponent } from './pages/create-model/create-model.component';
import { ModelsComponent } from './pages/models/models.component';
import { EditModelComponent } from './pages/edit-model/edit-model.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { AdminGuard } from '../../modules/auth/admin.guard';
import { UsersComponent } from './pages/users/users.component';
import { AdConfigComponent } from './pages/ad-config/ad-config.component';
import { AdCampaignListComponent } from './pages/ad-campaign-list/ad-campaign-list.component';

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
                path: 'products',
                component: ProductListComponent,
            },
            {
                path: 'ad-campaigns',
                component: AdCampaignListComponent,
            },
            {
                path: 'users',
                component: UsersComponent,
            },
            {
                path: 'ad-config',
                component: AdConfigComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
