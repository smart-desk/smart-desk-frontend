import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaFormComponent } from './textarea-form/textarea-form.component';
import { TextareaParamsComponent } from './textarea-params/textarea-params.component';
import { TextareaService } from './textarea.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

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
