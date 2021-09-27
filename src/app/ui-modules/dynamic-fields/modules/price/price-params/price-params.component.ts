import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { PriceParamsDto } from '../dto/price-params.dto';
import { CURRENCIES } from '../constants';
import { Field } from '../../../../../modules/field/models/field';

@Component({
    selector: 'app-price',
    templateUrl: './price-params.component.html',
    styleUrls: ['./price-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceParamsComponent extends AbstractFieldParamsComponent<PriceParamsDto> implements OnInit {
    form: FormGroup;
    currencies = CURRENCIES;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        const params = this.field.params;
        this.form = this.fb.group({
            filterable: [this.field.filterable || false],
            required: [this.field.required || false],
            title: [this.field.title || 'Цена', [Validators.required, Validators.maxLength(255)]],
            currency: [params?.currency || '', Validators.required],
        });
    }

    getField(): Field<unknown, PriceParamsDto> {
        this.field.filterable = this.form.get('filterable')?.value;
        this.field.required = this.form.get('required')?.value;
        this.field.title = this.form.get('title')?.value;
        this.field.params = {
            currency: this.form.get('currency')?.value,
        };

        return this.field;
    }

    isValid(): boolean {
        return this.form.valid;
    }
}
