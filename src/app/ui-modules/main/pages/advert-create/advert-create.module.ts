import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertCreateRoutingModule } from './advert-create-routing.module';
import { AdvertCreateComponent } from './components/advert-create/advert-create.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { FormsModule } from '@angular/forms';
import { MainModule } from '../../main.module';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@NgModule({
    declarations: [AdvertCreateComponent],
    imports: [CommonModule, AdvertCreateRoutingModule, NzSkeletonModule, NzCascaderModule, FormsModule, MainModule, NzTypographyModule],
})
export class AdvertCreateModule {}
