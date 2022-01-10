import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
    },
    {
        path: 'bookmarks',
        component: BookmarksComponent,
    },
    {
        path: 'my-products',
        component: MyProductsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
