import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';
import { AdvertComponent } from './pages/advert/advert.component';
import { AdvertEditComponent } from './pages/advert-edit/advert-edit.component';
import { AdvertCreateComponent } from './pages/advert-create/advert-create.component';

const NZModules = [NzCascaderModule];

const pages = [MainComponent, CategoriesComponent, CategoryComponent, AdvertComponent, AdvertEditComponent, AdvertCreateComponent];

@NgModule({
    declarations: [...pages],
    imports: [...NZModules, CommonModule, MainRoutingModule, FormsModule],
})
export class MainModule {}
