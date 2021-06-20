import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../models/abstract-field-form.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PriceEntity } from '../dto/price.entity';
import { PriceParamsDto } from '../dto/price-params.dto';
import { getCurrencySymbolByCode } from '../helpers';

@Component({
    selector: 'app-price',
    templateUrl: './price-form.component.html',
    styleUrls: ['./price-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceFormComponent extends AbstractFieldFormComponent<PriceEntity, PriceParamsDto> implements OnInit {
    form: FormGroup;
    currencySymbol = '';

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        const { data, params } = this.field;
        this.form = this.fb.group({ value: [data && data.value] });

        if (params && params.currency) {
            this.currencySymbol = getCurrencySymbolByCode(params.currency);
        }
    }

    getFieldData(): PriceEntity {
        const value = parseInt(this.form.get('value')?.value, 10);

        if (this.field.data) {
            this.field.data.value = value;
            return this.field.data;
        }

        const advertField = new PriceEntity();
        advertField.value = this.form.get('value')?.value;
        advertField.field_id = this.field.id;

        return advertField;
    }

    isFieldDataValid(): boolean {
        return this.form.valid;
    }
}
