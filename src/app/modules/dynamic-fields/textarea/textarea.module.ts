import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaFormComponent } from './textarea-form/textarea-form.component';
import { TextareaParamsComponent } from './textarea-params/textarea-params.component';
import { TextareaService } from './textarea.service';
import {
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzPopconfirmModule,
    NzTypographyModule,
} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NzFormModule,
        NzPopconfirmModule,
        NzTypographyModule,
        NzInputModule,
        FormsModule,
        ReactiveFormsModule,
        NzCheckboxModule,
        NzButtonModule,
        NzIconModule,
        NzGridModule,
    ],
    providers: [TextareaService],
    declarations: [TextareaFormComponent, TextareaParamsComponent],
    exports: [TextareaFormComponent, TextareaParamsComponent],
})
export class TextareaModule {}
