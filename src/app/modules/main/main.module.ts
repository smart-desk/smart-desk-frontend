import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CategoryComponent } from './pages/category/category.component';
import { AdvertComponent } from './pages/advert/advert.component';
import { AdvertEditComponent } from './pages/advert-edit/advert-edit.component';
import { AdvertCreateComponent } from './pages/advert-create/advert-create.component';
import { HeaderComponent } from './components/header/header.component';
import { AdvertsListComponent } from './components/adverts-list/adverts-list.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { IndexComponent } from './pages/index/index.component';
import { AdvertCardComponent } from './components/advert-card/advert-card.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { FiltersComponent } from './components/filters/filters.component';
import { NzCollapseModule } from "ng-zorro-antd/collapse";

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
];

const pages = [MainComponent, CategoryComponent, AdvertComponent, AdvertEditComponent, AdvertCreateComponent, IndexComponent];

const components = [HeaderComponent, NavigationHeaderComponent, AdvertCardComponent, AdvertsListComponent, ProfileComponent, FiltersComponent];

@NgModule({
    declarations: [...pages, ...components],
    imports: [...NZModules, CommonModule, MainRoutingModule, FormsModule, ReactiveFormsModule, SharedModule, NzCollapseModule],
})
export class MainModule {}
