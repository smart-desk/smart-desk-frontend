import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-form.component';
import { FormControl, FormGroup } from '@angular/forms';
import { PriceEntity } from '../dto/price.entity';
import { PriceParamsDto } from '../dto/price-params.dto';
import { getCurrencySignByCode } from '../helpers';

@Component({
    selector: 'app-price',
    templateUrl: './price-form.component.html',
    styleUrls: ['./price-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceFormComponent extends AbstractFieldFormComponent<PriceEntity, PriceParamsDto> implements OnInit {
    form: FormGroup;

    ngOnInit(): void {
        const data = this.field.data;
        this.form = new FormGroup({
            value: new FormControl(data && data.value),
        });
    }

    getCurrencySymbol(): string {
        const { params } = this.field;
        if (params && params.currency) {
            return getCurrencySignByCode(params.currency);
        }
        return '';
    }

    getFieldData(): PriceEntity {
        const value = parseInt(this.form.get('value').value, 10);

        if (this.field.data) {
            this.field.data.value = value;
            return this.field.data;
        }

        const advertField = new PriceEntity();
        advertField.value = this.form.get('value').value;
        advertField.field_id = this.field.id;

        return advertField;
    }

    isFieldDataValid(): boolean {
        return this.form.valid;
    }
}
