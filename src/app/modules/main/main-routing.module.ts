import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { CategoryComponent } from './pages/category/category.component';
import { AdvertComponent } from './pages/advert/advert.component';
import { AdvertEditComponent } from './pages/advert-edit/advert-edit.component';
import { AdvertCreateComponent } from './pages/advert-create/advert-create.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'adverts/create',
                component: AdvertCreateComponent,
            },
            {
                path: 'adverts/:advert_id/edit',
                component: AdvertEditComponent,
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
