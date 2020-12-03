import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotoParamsComponent } from './photo-params/photo-params.component';
import { PhotoService } from './photo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

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
        NzUploadModule,
        GalleryModule,
        LightboxModule,
    ],
    providers: [PhotoService],
    declarations: [PhotoFormComponent, PhotoParamsComponent, PhotoViewComponent],
    exports: [PhotoFormComponent, PhotoParamsComponent],
})
export class PhotoModule {}
