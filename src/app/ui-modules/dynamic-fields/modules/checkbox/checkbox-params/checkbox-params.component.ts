import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { CheckboxItem, CheckboxParamsDto } from '../dto/checkbox-params.dto';
import { Field } from '../../../../../modules/field/models/field';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox-params.component.html',
    styleUrls: ['./checkbox-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxParamsComponent extends AbstractFieldParamsComponent<CheckboxParamsDto> implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        const { params } = this.field;
        const checkboxes = params?.checkboxes
            ? params.checkboxes.map(data => this.createCheckboxControl(data))
            : [this.createCheckboxControl()];

        this.form = this.fb.group({
            title: [this.field.title || ''],
            required: [this.field.required || false],
            filterable: [this.field.filterable || false],
            checkboxes: this.fb.array(checkboxes),
        });
    }

    get checkboxes() {
        return this.form.get('checkboxes') as FormArray;
    }

    addCheckbox(): void {
        this.checkboxes.push(this.createCheckboxControl());
    }

    getField(): Field<unknown, CheckboxParamsDto> {
        const checkboxes = this.convertControlsToCheckboxes(this.checkboxes.getRawValue());

        this.field.title = this.form.get('title')?.value;
        this.field.required = this.form.get('filterable')?.value;
        this.field.filterable = this.form.get('required')?.value;
        this.field.params = { checkboxes };

        return this.field;
    }

    deleteCheckbox(i: number): void {
        this.checkboxes.removeAt(i);
    }

    isValid(): boolean {
        return this.form.valid;
    }

    private createCheckboxControl(checkbox?: CheckboxItem): FormGroup {
        return this.fb.group({
            label: [(checkbox && checkbox.label) || '', [Validators.required, Validators.maxLength(255)]],
            value: (checkbox && checkbox.value) || '',
        });
    }

    private convertControlsToCheckboxes(controls: { label: string; value: string }[]): CheckboxItem[] {
        return controls.map((data: CheckboxItem) => {
            const value = new CheckboxItem();
            value.label = data.label;
            value.value = data.label.replace(/\s/g, '').trim().toLocaleLowerCase();
            return value;
        });
    }
}
