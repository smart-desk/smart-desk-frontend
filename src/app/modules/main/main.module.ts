import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgZorroAntdModule, NzInputModule, NzSelectModule } from 'ng-zorro-antd';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';
import { AdvertComponent } from './pages/advert/advert.component';
import { AdvertEditComponent } from './pages/advert-edit/advert-edit.component';
import { AdvertCreateComponent } from './pages/advert-create/advert-create.component';
import { HeaderComponent } from './components/header/header.component';
import { AdvertsListComponent } from './components/adverts-list/adverts-list.component';

const NZModules = [
    NzCascaderModule,
    NzFormModule,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzTypographyModule,
    NzSkeletonModule,
    NzInputModule,
];

const pages = [
    MainComponent,
    CategoriesComponent,
    CategoryComponent,
    AdvertComponent,
    AdvertEditComponent,
    AdvertCreateComponent,
    AdvertsListComponent,
];

const components = [HeaderComponent];

@NgModule({
    declarations: [...pages, ...components],
    imports: [...NZModules, CommonModule, MainRoutingModule, FormsModule, ReactiveFormsModule, NzSelectModule, NgZorroAntdModule],
})
export class MainModule {}
