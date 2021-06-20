import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { RadioItem, RadioParamsDto } from '../dto/radio-params.dto';
import { Field } from '../../../../../modules/field/models/field';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-params.component.html',
    styleUrls: ['./radio-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioParamsComponent extends AbstractFieldParamsComponent<RadioParamsDto> implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        const params = this.field.params;
        const radios = params && params.radios ? params.radios.map(data => this.createRadioControl(data)) : [this.createRadioControl()];

        this.form = this.fb.group({
            title: [this.field.title || ''],
            required: [this.field.required || false],
            filterable: [this.field.filterable || false],
            radios: this.fb.array(radios),
        });
    }

    get radios() {
        return this.form.get('radios') as FormArray;
    }

    addRadio(): void {
        this.radios.push(this.createRadioControl());
    }

    getField(): Field<unknown, RadioParamsDto> {
        const radios = this.convertControlsToRadios(this.radios.getRawValue());

        this.field.title = this.form.get('title')?.value;
        this.field.filterable = this.form.get('filterable')?.value;
        this.field.required = this.form.get('required')?.value;
        this.field.params = { radios };

        return this.field;
    }

    deleteRadio(i: number): void {
        this.radios.removeAt(i);
    }

    private createRadioControl(radio?: RadioItem): FormGroup {
        return this.fb.group({
            label: (radio && radio.label) || '',
            value: (radio && radio.value) || '',
        });
    }

    private convertControlsToRadios(controls: { label: string; value: string }[]): RadioItem[] {
        return controls.map((data: RadioItem) => {
            const value = new RadioItem();
            value.label = data.label;
            value.value = data.label.replace(/\s/g, '').trim().toLocaleLowerCase();
            return value;
        });
    }
}
