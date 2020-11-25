import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PhotoEntity } from '../../../../shared/models/dto/field-data/photo.entity';
import { PhotoParamsDto } from '../../../../shared/models/dto/field-data/photo-params.dto';

@Component({
    selector: 'app-textarea',
    templateUrl: './photo-form.component.html',
    styleUrls: ['./photo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoFormComponent extends AbstractFieldFormComponent<PhotoEntity, PhotoParamsDto> implements OnInit {
    formGroup: FormGroup;

    ngOnInit(): void {
        const params = this.field.params as PhotoParamsDto;
        const urls = (this.field.data && this.field.data.value) || Array(params.max).fill('');

        this.formGroup = new FormGroup({
            urls: new FormArray(urls.map(url => new FormControl(url))),
        });
    }

    get urls() {
        return this.formGroup.get('urls') as FormArray;
    }

    getFieldData(): any {
        // if (this.field.data) {
        //     this.field.data.value = this.form.get('value').value; // todo
        //     return this.field.data;
        // }

        // console.log(this.urlsForm.getRawValue());

        // const advertField = new PhotoEntity();
        // advertField.value = this.form.get('value').value;
        // advertField.field_id = this.field.id;

        // return advertField;
        return [];
    }

    isFieldDataValid(): boolean {
        return this.formGroup.valid;
    }
}
