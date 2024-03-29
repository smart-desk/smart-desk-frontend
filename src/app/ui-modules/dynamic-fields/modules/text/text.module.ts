import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFormComponent } from './text-form/text-form.component';
import { TextParamsComponent } from './text-params/text-params.component';
import { TextService } from './text.service';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { editorSettings } from '../../../../app.config';

@NgModule({
    imports: [
        CommonModule,
        NzFormModule,
        NzGridModule,
        NzTypographyModule,
        NzPopconfirmModule,
        NzIconModule,
        NzButtonModule,
        QuillModule.forRoot(editorSettings),
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [TextService],
    declarations: [TextFormComponent, TextParamsComponent],
    exports: [TextFormComponent, TextParamsComponent],
})
export class TextModule {}
