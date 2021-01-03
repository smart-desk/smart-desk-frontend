import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFilterComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-filter.component';
import { PriceParamsDto } from '../dto/price-params.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filter } from '../../../../shared/modules/dynamic-fields/models/filter';
import { PriceFilterDto } from '../dto/price-filter.dto';

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

    getFilterValue(): Filter<PriceFilterDto> {
        if (!this.form.touched) {
            return;
        }
        return new Filter(this.field.id, this.form.getRawValue());
    }
}
