import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { MyAdCampaignsComponent } from './pages/my-ad-campaigns/my-ad-campaigns.component';
import { CreateAdCampaignComponent } from './pages/create-ad-campaign/create-ad-campaign.component';
import { UpdateAdCampaignComponent } from './pages/update-ad-campaign/update-ad-campaign.component';

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
    {
        path: 'my-ad-campaigns',
        component: MyAdCampaignsComponent,
    },
    {
        path: 'my-ad-campaigns/create',
        component: CreateAdCampaignComponent,
    },
    {
        path: 'my-ad-campaigns/:id/update',
        component: UpdateAdCampaignComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
