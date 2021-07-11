import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { environment } from '../../../environments/environment';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { SharedModule } from '../../shared.module';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { AdvertCardComponent } from './components/advert-card/advert-card.component';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ProfileSideBarComponent } from './components/profile-side-bar/profile-side-bar.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AdvertsComponent } from './components/adverts/adverts.component';
import { FormNameComponent } from './components/form-name/form-name.component';
import { FormPhoneComponent } from './components/form-phone/form-phone.component';
import { FormVerifyComponent } from './components/form-verify/form-verify.component';
import { AdvertFormComponent } from './components/advert-form/advert-form.component';
import { VkRedirectComponent } from './components/vk-redirect/vk-redirect.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { AdvertComponent } from './pages/advert/components/advert/advert.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { AdCardComponent } from '../admin/components/ad-card/ad-card.component';

const NZModules = [
    NzModalModule,
    NzCascaderModule,
    NzFormModule,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzTypographyModule,
    NzSkeletonModule,
    NzInputModule,
    NzSelectModule,
    NzSpinModule,
    NzCardModule,
    NzPaginationModule,
    NzAvatarModule,
    NzDropDownModule,
    NzCollapseModule,
    NzDividerModule,
    NzTableModule,
    NzUploadModule,
    NzTabsModule,
    NzRadioModule,
    SharedModule,
    NzResultModule,
];

const components = [
    AdvertComponent,
    MainComponent,
    ContentLayoutComponent,
    HeaderComponent,
    NavigationHeaderComponent,
    AdvertCardComponent,
    ProfileMenuComponent,
    FiltersComponent,
    ProfileSideBarComponent,
    UserInfoComponent,
    AdvertsComponent,
    FormNameComponent,
    FormPhoneComponent,
    FormVerifyComponent,
    AdvertFormComponent,
    SortingComponent,
    VkRedirectComponent,
    AdCardComponent,
];

@NgModule({
    declarations: [...components],
    exports: [...components],
    imports: [
        ...NZModules,
        SharedModule,
        CommonModule,
        MainRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: environment.googleMapsApiKey,
            libraries: ['places'],
            language: 'ru',
        }),
    ],
})
export class MainModule {}
