import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFormComponent } from './text-form/text-form.component';
import { TextParamsComponent } from './text-params/text-params.component';
import { TextService } from './text.service';
import { NzButtonModule, NzFormModule, NzGridModule, NzIconModule, NzPopconfirmModule, NzTypographyModule } from 'ng-zorro-antd';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { editorSettings } from '../../../app.config';

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
    ],
    providers: [TextService],
    declarations: [TextFormComponent, TextParamsComponent],
    exports: [TextFormComponent, TextParamsComponent],
})
export class TextModule {}
