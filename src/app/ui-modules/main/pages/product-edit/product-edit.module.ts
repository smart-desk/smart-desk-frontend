import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductEditRoutingModule } from './product-edit-routing.module';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { SharedMainModule } from '../../shared-main.module';

@NgModule({
    declarations: [ProductEditComponent],
    imports: [CommonModule, ProductEditRoutingModule, SharedMainModule],
})
export class ProductEditModule {}
