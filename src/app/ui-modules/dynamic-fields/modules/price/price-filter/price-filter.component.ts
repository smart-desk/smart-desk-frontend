import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { omitBy, isNull } from 'lodash';
import { AbstractFieldFilterComponent } from '../../../models/abstract-field-filter.component';
import { PriceParamsDto } from '../dto/price-params.dto';
import { Filter } from '../../../../../modules/product/models/filter';
import { PriceFilterDto } from '../dto/price-filter.dto';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-price-filter',
    templateUrl: './price-filter.component.html',
    styleUrls: ['./price-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceFilterComponent extends AbstractFieldFilterComponent<PriceParamsDto, PriceFilterDto> implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            from: [this.filter?.getFilterParams()?.from],
            to: [this.filter?.getFilterParams()?.to],
        });

        this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.onFormChange$.next());
    }

    getActiveFilters(): number {
        const { from, to } = this.form.getRawValue();
        return from || to ? 1 : 0;
    }

    getFilterValue(): Filter<PriceFilterDto> | null {
        if (this.form.touched || !this.emptyValues()) {
            const form = this.excludeEmptyValues();
            return new Filter(this.field.id, form);
        }
        return null;
    }

    dropFilters(): void {
        this.filter = null;
        this.updateFormValues();
    }

    private updateFormValues(): void {
        this.form.patchValue(
            {
                from: this.filter?.getFilterParams()?.from,
                to: this.filter?.getFilterParams()?.to,
            },
            { onlySelf: true }
        );
    }

    private emptyValues(): boolean {
        return isNull(this.form.get('from')?.value) && isNull(this.form.get('to')?.value);
    }

    private excludeEmptyValues(): PriceFilterDto {
        return omitBy(this.form.getRawValue(), isNull);
    }
}
