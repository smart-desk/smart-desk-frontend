import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceFormComponent } from './price-form/price-form.component';
import { PriceParamsComponent } from './price-params/price-params.component';
import { PriceService } from './price.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PriceViewComponent } from './price-view/price-view.component';
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { PriceFilterComponent } from './price-filter/price-filter.component';

@NgModule({
    imports: [
        CommonModule,
        NzFormModule,
        NzPopconfirmModule,
        NzTypographyModule,
        NzInputModule,
        FormsModule,
        ReactiveFormsModule,
        NzButtonModule,
        NzIconModule,
        NzGridModule,
        NzSelectModule,
        NzCheckboxModule,
    ],
    providers: [PriceService],
    declarations: [PriceFormComponent, PriceParamsComponent, PriceViewComponent, PriceFilterComponent],
})
export class PriceModule {}
