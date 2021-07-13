import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductEditRoutingModule } from './product-edit-routing.module';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { MainModule } from '../../main.module';

@NgModule({
    declarations: [ProductEditComponent],
    imports: [CommonModule, ProductEditRoutingModule, MainModule],
})
export class ProductEditModule {}
