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
    NzCarouselModule,
} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoViewComponent } from './photo-view/photo-view.component';

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
        NzCarouselModule,
    ],
    providers: [PhotoService],
    declarations: [PhotoFormComponent, PhotoParamsComponent, PhotoViewComponent],
    exports: [PhotoFormComponent, PhotoParamsComponent],
})
export class PhotoModule {}
