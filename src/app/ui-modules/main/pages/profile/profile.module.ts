import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { MainModule } from '../../main.module';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { MyAdCampaignsComponent } from './pages/my-ad-campaigns/my-ad-campaigns.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CreateAdCampaignComponent } from './pages/create-ad-campaign/create-ad-campaign.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SharedModule } from '../../../../shared.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { AdCampaignDirective } from './pages/ad-campaign.directive';
import { UpdateAdCampaignComponent } from './pages/update-ad-campaign/update-ad-campaign.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';

const components = [
    ProfileComponent,
    BookmarksComponent,
    MyProductsComponent,
    NotificationsComponent,
    MyAdCampaignsComponent,
    CreateAdCampaignComponent,
    UpdateAdCampaignComponent,
];

@NgModule({
    declarations: [...components, AdCampaignDirective],
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
        SharedModule,
        NzFormModule,
        NzTypographyModule,
        NzSpaceModule,
    ],
})
export class ProfileModule {}
