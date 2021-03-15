import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxFormComponent } from './checkbox-form/checkbox-form.component';
import { CheckboxParamsComponent } from './checkbox-params/checkbox-params.component';
import { CheckboxService } from './checkbox.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CheckboxViewComponent } from './checkbox-view/checkbox-view.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CheckboxFilterComponent } from './checkbox-filter/checkbox-filter.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NzFormModule,
        NzTypographyModule,
        NzButtonModule,
        NzIconModule,
        NzPopconfirmModule,
        NzInputModule,
        ReactiveFormsModule,
        NzDividerModule,
        NzCheckboxModule,
    ],
    providers: [CheckboxService],
    declarations: [CheckboxFormComponent, CheckboxParamsComponent, CheckboxViewComponent, CheckboxFilterComponent],
})
export class CheckboxModule {}
