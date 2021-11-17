import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProductRoutingModule } from './product-routing.module';
import { SharedMainModule } from '../../shared-main.module';
import { ProductComponent } from './components/product/product.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
    declarations: [ProductComponent],
    exports: [ProductComponent],
    imports: [
        SharedMainModule,
        CommonModule,
        NzAvatarModule,
        ProductRoutingModule,
        NzIconModule,
        NzButtonModule,
        NzAlertModule,
        NzGridModule,
    ],
})
export class ProductModule {}
