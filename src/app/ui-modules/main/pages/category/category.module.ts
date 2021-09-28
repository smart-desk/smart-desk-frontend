import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './pages/category/category.component';
import { SharedMainModule } from '../../shared-main.module';
import { SharedModule } from '../../../../shared.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
    declarations: [CategoryComponent],
    imports: [CommonModule, CategoryRoutingModule, SharedMainModule, SharedModule, NzButtonModule, NzIconModule],
})
export class CategoryModule {}
