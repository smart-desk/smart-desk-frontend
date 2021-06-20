import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFilterComponent } from '../../../models/abstract-field-filter.component';
import { CheckboxItem, CheckboxParamsDto } from '../dto/checkbox-params.dto';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Filter } from '../../../../../services/advert/models/filter';
import { CheckboxFilterDto } from '../dto/checkbox-filter.dto';

@Component({
    selector: 'app-checkbox-filter',
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
            checkboxes: this.fb.array(this.field.params.checkboxes.map(cb => this.fb.control(this.getCheckboxState(cb)))),
        });
    }

    get checkboxes(): FormArray {
        return this.form.get('checkboxes') as FormArray;
    }

    getFilterValue(): Filter<CheckboxFilterDto> | null {
        if (this.form.touched || !this.emptyValues()) {
            const selectedCbs = this.form.value.checkboxes
                .map((checked: boolean, i: number) => (checked ? this.field.params.checkboxes[i].value : null))
                .filter((v: any) => !!v);

            return new Filter(this.field.id, selectedCbs);
        }
        return null;
    }

    dropFilters(): void {
        this.filter = null;
        this.form.patchValue(
            {
                checkboxes: this.field.params.checkboxes.map(() => false),
            },
            { onlySelf: true }
        );
    }

    private emptyValues(): boolean {
        return this.form.value.checkboxes.every((checked: boolean) => !checked);
    }

    private getCheckboxState(checkbox: CheckboxItem): boolean {
        return !!this.filter && !!this.filter.getFilterParams() && this.filter.getFilterParams().includes(checkbox.value);
    }
}
