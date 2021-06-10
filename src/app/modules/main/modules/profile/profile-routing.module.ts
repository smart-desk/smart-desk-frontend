import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { MyAdvertsComponent } from './components/my-adverts/my-adverts.component';
import { MyAdCampaignsComponent } from './components/my-ad-campaigns/my-ad-campaigns.component';

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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
