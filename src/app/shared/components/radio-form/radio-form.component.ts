import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';
import { AdvertFieldBase, CreatorFieldRadio } from '../../models/models.dto';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-form.component.html',
    styleUrls: ['./radio-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFormComponent extends FieldFormComponent<CreatorFieldRadio[]> implements OnInit {
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
