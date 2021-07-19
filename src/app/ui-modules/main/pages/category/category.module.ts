import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './pages/category/category.component';
import { SharedMainModule } from '../../shared-main.module';
import { SharedModule } from '../../../../shared.module';

@NgModule({
    declarations: [CategoryComponent],
    imports: [CommonModule, CategoryRoutingModule, SharedMainModule, SharedModule],
})
export class CategoryModule {}
