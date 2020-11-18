import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SectionType } from '../../../../shared/models/section.model';
import { Advert } from '../../../../shared/models/dto/advert.entity';

@Component({
    selector: 'app-advert-card',
    templateUrl: './advert-card.component.html',
    styleUrls: ['./advert-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertCardComponent {
    @Input() advert: Advert;

    getPrice(): string {
        if (this.advert) {
            const priceSection = this.advert.sections.find(section => section.type === SectionType.PRICE);
            if (priceSection && priceSection.fields) {
                return priceSection.fields[0].data as string; // todo value
            }
            return '';
        }
    }
}
