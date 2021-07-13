import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProductRoutingModule } from './product-routing.module';
import { MainModule } from '../../main.module';

// TODO: Подключить как фича модуль
@NgModule({
    declarations: [],
    imports: [MainModule, CommonModule, NzAvatarModule, ProductRoutingModule, NzIconModule, NzButtonModule],
})
export class ProductModule {}
