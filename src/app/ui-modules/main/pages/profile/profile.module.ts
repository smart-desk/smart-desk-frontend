import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { MyAdvertsComponent } from './components/my-adverts/my-adverts.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { MainModule } from '../../main.module';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { MyAdCampaignsComponent } from './components/my-ad-campaigns/my-ad-campaigns.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

const components = [ProfileComponent, BookmarksComponent, MyAdvertsComponent, NotificationsComponent, MyAdCampaignsComponent];

@NgModule({
    declarations: [...components],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MainModule,
        NzTableModule,
        NzTabsModule,
        NzButtonModule,
        ReactiveFormsModule,
        NzCheckboxModule,
    ],
})
export class ProfileModule {}
