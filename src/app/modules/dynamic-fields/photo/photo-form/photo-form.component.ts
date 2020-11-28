import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { PhotoEntity } from '../../../../shared/models/dto/field-data/photo.entity';
import { PhotoParamsDto } from '../../../../shared/models/dto/field-data/photo-params.dto';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd';
import { UploadImageResponse } from '../../../../shared/models/dto/upload-image-response';
import { InputTextEntity } from '../../../../shared/models/dto/field-data/input-text.entity';

@Component({
    selector: 'app-textarea',
    templateUrl: './photo-form.component.html',
    styleUrls: ['./photo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoFormComponent extends AbstractFieldFormComponent<PhotoEntity, PhotoParamsDto> {
    fileList: NzUploadFile[] = [];

    listChanged(event: NzUploadChangeParam) {
        if (event.type === 'success') {
            this.fileList = event.fileList;
        }
    }

    getFieldData(): PhotoEntity {
        const value = this.fileList.map(file => (file.response as UploadImageResponse).url);

        if (this.field.data) {
            this.field.data.value = value;
            return this.field.data;
        }

        const fieldData = new PhotoEntity();
        fieldData.value = value;
        fieldData.field_id = this.field.id;

        return fieldData;
    }

    isFieldDataValid(): boolean {
        return true;
    }
}
