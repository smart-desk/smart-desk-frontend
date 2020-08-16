import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';
import { AdvertComponent } from './pages/advert/advert.component';
import { AdvertEditComponent } from './pages/advert-edit/advert-edit.component';
import { AdvertCreateComponent } from './pages/advert-create/advert-create.component';

@NgModule({
    declarations: [MainComponent, CategoriesComponent, CategoryComponent, AdvertComponent, AdvertEditComponent, AdvertCreateComponent],
    imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
