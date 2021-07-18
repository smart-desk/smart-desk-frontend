import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateRoutingModule } from './product-create-routing.module';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { FormsModule } from '@angular/forms';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SharedMainModule } from '../../shared-main.module';

@NgModule({
    declarations: [ProductCreateComponent],
    imports: [
        CommonModule,
        ProductCreateRoutingModule,
        NzSkeletonModule,
        NzCascaderModule,
        FormsModule,
        NzTypographyModule,
        SharedMainModule,
    ],
})
export class ProductCreateModule {}
