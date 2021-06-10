import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { MyAdvertsComponent } from './components/my-adverts/my-adverts.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { MainModule } from '../../main.module';
import { MyAdCampaignsComponent } from './components/my-ad-campaigns/my-ad-campaigns.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
    declarations: [ProfileComponent, BookmarksComponent, MyAdvertsComponent, MyAdCampaignsComponent],
    imports: [CommonModule, ProfileRoutingModule, MainModule, NzTableModule, NzTabsModule, NzButtonModule],
})
export class ProfileModule {}
