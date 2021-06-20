import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Advert } from '../../../../modules/advert/models/advert.entity';
import { FieldType, SectionType } from '../../../../modules/field/models/field.entity';
import { PriceEntity } from '../../../dynamic-fields/modules/price/dto/price.entity';
import { PriceParamsDto } from '../../../dynamic-fields/modules/price/dto/price-params.dto';
import { getCurrencySymbolByCode, roundPrice } from '../../../dynamic-fields/modules/price/helpers';
import { PhotoEntity } from '../../../dynamic-fields/modules/photo/dto/photo.entity';

export interface ExtraActions {
    title: string;
    action: (advert: Advert) => void;
}

@Component({
    selector: 'app-advert-card',
    templateUrl: './advert-card.component.html',
    styleUrls: ['./advert-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertCardComponent implements OnInit {
    @Input() advert: Advert;
    @Input() extraActions: ExtraActions[];
    @Output() createBookmark = new EventEmitter<string>();
    @Output() deleteBookmark = new EventEmitter<string>();
    title = '';
    description = '';
    thumb = '';

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.title = this.getTitle();
        this.description = this.getDescription();
        this.thumb = this.getThumbSrc();
        this.cd.detectChanges();
    }

    toggleBookmark(advertId: string): void {
        if (this.advert.isBookmark) {
            this.deleteBookmark.emit(advertId);
        } else {
            this.createBookmark.emit(advertId);
        }
        this.advert.isBookmark = !this.advert.isBookmark;
        this.cd.detectChanges();
    }

    private getThumbSrc(): string {
        const photoField = this.advert.fields.find(s => s.section === SectionType.PARAMS && s.type === FieldType.PHOTO);
        if (!photoField) {
            return '';
        }
        if (photoField && photoField.data && (photoField.data as PhotoEntity).value) {
            return (photoField.data as PhotoEntity).value[0];
        }
        return '';
    }

    private getTitle(): string {
        return this.getPrice() ? this.getPrice() : this.advert.title;
    }

    private getDescription(): string {
        return this.getPrice() ? this.advert.title : '';
    }

    private getPrice(): string {
        const priceField = this.advert.fields.find(s => s.section === SectionType.PRICE && s.type === FieldType.PRICE);
        if (!priceField) {
            return '';
        }

        if (!priceField.data || !priceField.params) {
            return '';
        }

        const price = priceField.data && (priceField.data as PriceEntity).value;
        const currency = priceField.params && (priceField.params as PriceParamsDto).currency;
        if (!price || !currency) {
            return '';
        }

        return roundPrice(price) + getCurrencySymbolByCode(currency);
    }
}
