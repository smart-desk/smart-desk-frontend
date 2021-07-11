import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { MyAdvertsComponent } from './pages/my-adverts/my-adverts.component';
import { MyAdCampaignsComponent } from './pages/my-ad-campaigns/my-ad-campaigns.component';
import { CreateAdCampaignComponent } from './pages/create-ad-campaign/create-ad-campaign.component';

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
        path: 'my-adverts',
        component: MyAdvertsComponent,
    },
    {
        path: 'my-ad-campaigns',
        component: MyAdCampaignsComponent,
    },
    {
        path: 'my-ad-campaigns/create',
        component: CreateAdCampaignComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
