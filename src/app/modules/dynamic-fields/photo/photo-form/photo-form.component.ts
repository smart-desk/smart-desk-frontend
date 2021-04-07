import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-form.component';
import { PhotoEntity } from '../dto/photo.entity';
import { PhotoParamsDto } from '../dto/photo-params.dto';
import { UploadImageResponse } from '../../../../shared/models/image/upload-image-response';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
    selector: 'app-photo',
    templateUrl: './photo-form.component.html',
    styleUrls: ['./photo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoFormComponent extends AbstractFieldFormComponent<PhotoEntity, PhotoParamsDto> implements OnInit {
    fileList: NzUploadFile[] = [];

    ngOnInit() {
        if (this.field && this.field.data && this.field.data.value) {
            this.fileList = this.field.data.value.map((url, i) => ({
                uid: `${(i += 1)}`,
                name: `${i}`,
                status: 'done',
                url,
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
            return file.response ? (file.response as UploadImageResponse).url : file.url;
        });

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
