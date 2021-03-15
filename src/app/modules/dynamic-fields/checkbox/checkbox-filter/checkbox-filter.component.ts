import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFilterComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-filter.component';
import { CheckboxItem, CheckboxParamsDto } from '../dto/checkbox-params.dto';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Filter } from '../../../../shared/modules/dynamic-fields/models/filter';
import { CheckboxFilterDto } from '../dto/checkbox-filter.dto';

@Component({
    selector: 'app-radio-filter',
    templateUrl: './checkbox-filter.component.html',
    styleUrls: ['./checkbox-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxFilterComponent extends AbstractFieldFilterComponent<CheckboxParamsDto, CheckboxFilterDto> implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            checkboxes: this.fb.array(this.field.params.checkboxes.map(radio => this.fb.control(this.getCheckboxState(radio)))),
        });
    }

    get checkboxes(): FormArray {
        return this.form.get('checkboxes') as FormArray;
    }

    getFilterValue(): Filter<CheckboxFilterDto> {
        if (this.form.touched || !this.emptyValues()) {
            const selectedRadios = this.form.value.checkboxes
                .map((checked, i) => (checked ? this.field.params.checkboxes[i].value : null))
                .filter(v => !!v);

            return new Filter(this.field.id, selectedRadios);
        }
        return;
    }

    dropFilters(): void {
        this.filter = undefined;
        this.form.patchValue(
            {
                radios: this.field.params.checkboxes.map(() => false),
            },
            { onlySelf: true }
        );
    }

    private emptyValues(): boolean {
        return this.form.value.radios.every(checked => !checked);
    }

    private getCheckboxState(checkbox: CheckboxItem): boolean {
        return !!this.filter && !!this.filter.getFilterParams() && this.filter.getFilterParams().includes(checkbox.value);
    }
}
