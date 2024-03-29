import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../models/abstract-field-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        const validators = [];
        if (this.field.required) {
            validators.push(Validators.required);
        }
        this.form = this.fb.group({ value: [data?.value, validators] });

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

        const productField = new PriceEntity();
        productField.value = this.form.get('value')?.value;
        productField.fieldId = this.field.id;

        return productField;
    }

    isFieldDataValid(): boolean {
        this.form.markAllAsTouched();
        this.form.get('value')?.updateValueAndValidity({ emitEvent: true });

        return this.form.valid;
    }
}
