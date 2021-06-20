import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './components/category/category.component';
import { MainModule } from '../../main.module';

@NgModule({
    declarations: [CategoryComponent],
    imports: [CommonModule, CategoryRoutingModule, MainModule],
})
export class CategoryModule {}
