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
import { NzNotificationModule } from 'ng-zorro-antd/notification';
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
import { CategoryComponent } from './pages/category/category.component';
import { AdvertComponent } from './pages/advert/advert.component';
import { AdvertEditComponent } from './pages/advert-edit/advert-edit.component';
import { AdvertCreateComponent } from './pages/advert-create/advert-create.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { IndexComponent } from './pages/index/index.component';
import { AdvertCardComponent } from './components/advert-card/advert-card.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { FiltersComponent } from './components/filters/filters.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { ProfileComponent } from './pages/profile/profile.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { MyAdvertsComponent } from './pages/my-adverts/my-adverts.component';
import { ProfileSideBarComponent } from './components/profile-side-bar/profile-side-bar.component';
import { UserComponent } from './pages/user/user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AdvertsComponent } from './components/adverts/adverts.component';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';

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
    NzNotificationModule,
    NzAvatarModule,
    NzDropDownModule,
    NzCollapseModule,
    NzDividerModule,
    NzTableModule,
    NzUploadModule,
    NzTabsModule,
    NzRadioModule,
];

const pages = [
    MainComponent,
    CategoryComponent,
    AdvertComponent,
    AdvertEditComponent,
    AdvertCreateComponent,
    IndexComponent,
    UserComponent,
];

const components = [
    ContentLayoutComponent,
    HeaderComponent,
    NavigationHeaderComponent,
    AdvertCardComponent,
    ProfileComponent,
    ProfileMenuComponent,
    FiltersComponent,
    BookmarksComponent,
    MyAdvertsComponent,
    ProfileSideBarComponent,
    UserInfoComponent,
    AdvertsComponent,
];

@NgModule({
    declarations: [...pages, ...components],
    imports: [
        ...NZModules,
        CommonModule,
        MainRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: environment.googleMapsApiKey,
            libraries: ['places'],
            language: 'ru',
        }),
    ],
})
export class MainModule {}
