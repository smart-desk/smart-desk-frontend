import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotoParamsComponent } from './photo-params/photo-params.component';
import { PhotoService } from './photo.service';
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
    providers: [PhotoService],
    declarations: [PhotoFormComponent, PhotoParamsComponent],
    exports: [PhotoFormComponent, PhotoParamsComponent],
})
export class PhotoModule {}
