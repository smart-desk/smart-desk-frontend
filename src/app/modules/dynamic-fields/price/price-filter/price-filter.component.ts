import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFilterComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-filter.component';
import { PriceParamsDto } from '../dto/price-params.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filters } from '../../../../shared/models/dto/advert.dto';

@Component({
    selector: 'app-price-filter',
    templateUrl: './price-filter.component.html',
    styleUrls: ['./price-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceFilterComponent extends AbstractFieldFilterComponent<PriceParamsDto> implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            from: [null],
            to: [null],
        });
    }

    getFilterValue(): Filters {
        if (!this.form.touched) {
            return;
        }
        return { [this.field.id]: this.form.getRawValue() };
    }
}
