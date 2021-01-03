import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldViewComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-view.component';
import { PriceEntity } from '../dto/price.entity';
import { PriceParamsDto } from '../dto/price-params.dto';
import { getCurrencySymbolByCode, roundPrice } from '../helpers';

@Component({
    selector: 'app-price-view',
    templateUrl: './price-view.component.html',
    styleUrls: ['./price-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceViewComponent extends AbstractFieldViewComponent<PriceEntity, PriceParamsDto> implements OnInit {
    currencySymbol = '';
    price = '0';

    ngOnInit() {
        const { params, data } = this.field;
        if (params && params.currency) {
            this.currencySymbol = getCurrencySymbolByCode(params.currency);
        }
        if (data && data.value) {
            this.price = roundPrice(data.value);
        }
    }
}
