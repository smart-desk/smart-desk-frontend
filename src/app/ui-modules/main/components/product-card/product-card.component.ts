import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../../modules/product/models/product.entity';
import { FieldType, SectionType } from '../../../../modules/field/models/field.entity';
import { PriceEntity } from '../../../dynamic-fields/modules/price/dto/price.entity';
import { PriceParamsDto } from '../../../dynamic-fields/modules/price/dto/price-params.dto';
import { getCurrencySymbolByCode, roundPrice } from '../../../dynamic-fields/modules/price/helpers';
import { PhotoEntity } from '../../../dynamic-fields/modules/photo/dto/photo.entity';

export interface ExtraActions {
    title: string;
    action: (product: Product) => void;
}

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
    @Input() product: Product;
    @Input() extraActions: ExtraActions[];
    @Input() promo: boolean;
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

    toggleBookmark(productId: string, event: MouseEvent): void {
        event.stopPropagation();
        if (this.product.isBookmark) {
            this.deleteBookmark.emit(productId);
        } else {
            this.createBookmark.emit(productId);
        }
        this.product.isBookmark = !this.product.isBookmark;
        this.cd.detectChanges();
    }

    private getThumbSrc(): string {
        const photoField = this.product.fields.find(s => s.section === SectionType.PARAMS && s.type === FieldType.PHOTO);
        if (!photoField) {
            return '';
        }
        if (photoField && photoField.data && (photoField.data as PhotoEntity).value) {
            return (photoField.data as PhotoEntity).value[0];
        }
        return '';
    }

    private getTitle(): string {
        return this.getPrice() ? this.getPrice() : this.product.title;
    }

    private getDescription(): string {
        return this.getPrice() ? this.product.title : '';
    }

    private getPrice(): string {
        const priceField = this.product.fields.find(s => s.section === SectionType.PRICE && s.type === FieldType.PRICE);
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
