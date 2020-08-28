import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FieldFormComponent } from '../field-form/field-form.component';
import { AdvertFieldBase, CreatorFieldInputText } from '../../models/models.dto';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text-form.component.html',
    styleUrls: ['./input-text-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextFormComponent extends FieldFormComponent<CreatorFieldInputText> implements OnInit {
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
