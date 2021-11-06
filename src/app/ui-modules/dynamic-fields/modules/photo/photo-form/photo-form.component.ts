import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../models/abstract-field-form.component';
import { PhotoEntity } from '../dto/photo.entity';
import { PhotoParamsDto } from '../dto/photo-params.dto';
import { UploadImageResponse } from '../dto/upload-image-response';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'app-photo',
    templateUrl: './photo-form.component.html',
    styleUrls: ['./photo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoFormComponent extends AbstractFieldFormComponent<PhotoEntity, PhotoParamsDto> implements OnInit {
    fileList: NzUploadFile[] = [];
    showValidationErrors = false;

    constructor(private cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        if (this?.field?.data?.value) {
            this.fileList = this.field.data.value.map((path, i) => ({
                uid: path,
                name: path,
                status: 'done',
                url: environment.s3path + path,
            }));
        }
    }

    listChanged(event: NzUploadChangeParam) {
        if (event.type === 'success') {
            this.fileList = event.fileList;
        }
    }

    getFieldData(): PhotoEntity {
        const value = this.fileList.map(file => {
            return file.response ? (file.response as UploadImageResponse).key : file.url?.replace(environment.s3path, '') || '';
        });

        if (this.field.data) {
            this.field.data.value = value;
            return this.field.data;
        }

        const fieldData = new PhotoEntity();
        fieldData.value = value;
        fieldData.fieldId = this.field.id;

        return fieldData;
    }

    isFieldDataValid(): boolean {
        this.showValidationErrors = true;
        this.cd.detectChanges();
        return this.fileList.length >= this.field.params.min && this.fileList.length <= this.field.params.max;
    }
}
