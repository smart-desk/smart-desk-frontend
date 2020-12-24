import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Advert } from '../../../../shared/models/dto/advert.entity';
import { SectionType } from '../../../../shared/models/dto/section.entity';
import { FieldType } from '../../../../shared/models/dto/field.entity';
import { PhotoEntity } from '../../../../shared/models/dto/field-data/photo.entity';
import { PriceEntity } from '../../../dynamic-fields/price/dto/price.entity';
import { getCurrencySymbolByCode, roundPrice } from '../../../dynamic-fields/price/helpers';
import { PriceParamsDto } from '../../../dynamic-fields/price/dto/price-params.dto';

@Component({
    selector: 'app-advert-card',
    templateUrl: './advert-card.component.html',
    styleUrls: ['./advert-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertCardComponent implements OnInit {
    @Input() advert: Advert;
    title = '';
    description = '';
    thumb = '';

    ngOnInit() {
        this.title = this.getTitle();
        this.description = this.getDescription();
        this.thumb = this.getThumbSrc();
    }

    private getThumbSrc(): string {
        const section = this.advert.sections.find(s => s.type === SectionType.PARAMS);
        if (!section || !section.fields.length) {
            return;
        }

        const photoField = section.fields.find(f => f.type === FieldType.PHOTO);
        if (photoField && photoField.data && (photoField.data as PhotoEntity).value) {
            return (photoField.data as PhotoEntity).value[0];
        }
    }

    private getTitle(): string {
        return this.getPrice() ? this.getPrice() : this.advert.title;
    }

    private getDescription(): string {
        return this.getPrice() ? this.advert.title : '';
    }

    private getPrice(): string {
        const priceSection = this.advert.sections.find(s => s.type === SectionType.PRICE);
        if (!priceSection) {
            return;
        }
        const priceField = priceSection.fields.find(f => f.type === FieldType.PRICE);
        if (!priceField) {
            return;
        }

        if (!priceField.data || !priceField.params) {
            return;
        }

        const price = priceField.data && (priceField.data as PriceEntity).value;
        const currency = priceField.params && (priceField.params as PriceParamsDto).currency;
        if (!price || !currency) {
            return;
        }

        return roundPrice(price) + getCurrencySymbolByCode(currency);
    }
}
