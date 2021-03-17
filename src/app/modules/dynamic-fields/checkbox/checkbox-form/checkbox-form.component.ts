import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-form.component';
import { CheckboxEntity } from '../dto/checkbox.entity';
import { CheckboxItem, CheckboxParamsDto } from '../dto/checkbox-params.dto';

@Component({
    selector: 'app-radio',
    templateUrl: './checkbox-form.component.html',
    styleUrls: ['./checkbox-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxFormComponent extends AbstractFieldFormComponent<CheckboxEntity, CheckboxParamsDto> {
    private currentValue: string[];

    getFieldData(): any {
        if (this.field.data) {
            this.field.data.value = this.currentValue;
            return this.field.data;
        }

        const advertField = new CheckboxEntity();
        advertField.value = this.currentValue;
        advertField.field_id = this.field.id;

        return advertField;
    }

    isFieldDataValid(): boolean {
        return true;
    }

    isChecked(cb: CheckboxItem): boolean {
        return this.field?.data?.value.some(c => c === cb.value);
    }

    checkboxChecked(checked: string[]): void {
        this.currentValue = checked;
    }
}
