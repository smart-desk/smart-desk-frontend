import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CreateAdCampaignComponent } from './components/create-ad-campaign/create-ad-campaign.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';

const components = [
    ProfileComponent,
    BookmarksComponent,
    MyAdvertsComponent,
    NotificationsComponent,
    MyAdCampaignsComponent,
    CreateAdCampaignComponent,
];

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
        NzDividerModule,
        NzDatePickerModule,
        FormsModule,
        NzSelectModule,
        NzUploadModule,
        NzInputModule,
    ],
})
export class ProfileModule {}
