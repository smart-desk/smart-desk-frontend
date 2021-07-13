import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateRoutingModule } from './product-create-routing.module';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { FormsModule } from '@angular/forms';
import { MainModule } from '../../main.module';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@NgModule({
    declarations: [ProductCreateComponent],
    imports: [CommonModule, ProductCreateRoutingModule, NzSkeletonModule, NzCascaderModule, FormsModule, MainModule, NzTypographyModule],
})
export class ProductCreateModule {}
