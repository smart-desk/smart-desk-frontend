import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextService } from './input-text.service';
import { InputTextFormComponent } from './input-text-form/input-text-form.component';
import { InputTextParamsComponent } from './input-text-params/input-text-params.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
    imports: [
        CommonModule,
        NzFormModule,
        NzTypographyModule,
        NzInputModule,
        NzCheckboxModule,
        ReactiveFormsModule,
        NzButtonModule,
        NzIconModule,
        NzPopconfirmModule,
    ],
    providers: [InputTextService],
    declarations: [InputTextFormComponent, InputTextParamsComponent],
    exports: [InputTextFormComponent, InputTextParamsComponent],
})
export class InputTextModule {}
