import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFilterComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-filter.component';
import { RadioParamsDto } from '../dto/radio-params.dto';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Filter } from '../../../../shared/modules/dynamic-fields/models/filter';
import { RadioFilterDto } from '../dto/radio-filter.dto';

@Component({
    selector: 'app-radio-filter',
    templateUrl: './radio-filter.component.html',
    styleUrls: ['./radio-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFilterComponent extends AbstractFieldFilterComponent<RadioParamsDto> implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            radios: new FormArray(this.field.params.radios.map(() => new FormControl(false))),
        });
    }

    get radios(): FormArray {
        return this.form.get('radios') as FormArray;
    }

    getFilterValue(): Filter<RadioFilterDto> {
        if (!this.form.touched) {
            return;
        }

        const selectedRadios = this.form.value.radios
            .map((checked, i) => (checked ? this.field.params.radios[i].value : null))
            .filter(v => !!v);

        return new Filter(this.field.id, selectedRadios);
    }
}
