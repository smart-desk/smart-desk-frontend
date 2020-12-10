import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFieldViewComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-view.component';
import { PriceEntity } from '../dto/price.entity';
import { PriceParamsDto } from '../dto/price-params.dto';
import { getCurrencySymbolByCode, roundPrice } from '../helpers';

@Component({
    selector: 'app-price-view',
    templateUrl: './price-view.component.html',
    styleUrls: ['./price-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceViewComponent extends AbstractFieldViewComponent<PriceEntity, PriceParamsDto> {
    getCurrencySymbol(): string {
        const { params } = this.field;
        if (params && params.currency) {
            return getCurrencySymbolByCode(params.currency);
        }
        return '';
    }

    getPrice(): string {
        const { data } = this.field;
        if (data && data.value) {
            return roundPrice(data.value);
        }
        return '0';
    }
}
