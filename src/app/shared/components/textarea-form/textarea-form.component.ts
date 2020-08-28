import { Component, OnInit } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';
import { AdvertFieldBase, CreatorFieldTextarea } from '../../models/models.dto';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea-form.component.html',
    styleUrls: ['./textarea-form.component.scss'],
})
export class TextareaFormComponent extends FieldFormComponent<CreatorFieldTextarea> implements OnInit {
    value: string;

    ngOnInit(): void {
        if (this.advertField) {
            this.value = this.advertField.value as string;
        }
    }

    getValue(): AdvertFieldBase {
        if (this.advertField) {
            this.advertField.value = this.value;
            return this.advertField;
        }

        const advertField = new AdvertFieldBase();
        advertField.value = this.value;
        advertField.field_id = this.field.id;

        return advertField;
    }
}
