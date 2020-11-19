import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzPopconfirmModule,
    NzTypographyModule,
} from 'ng-zorro-antd';
import { InputTextService } from './input-text.service';
import { InputTextFormComponent } from './input-text-form/input-text-form.component';
import { InputTextParamsComponent } from './input-text-params/input-text-params.component';
import { ReactiveFormsModule } from '@angular/forms';

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
