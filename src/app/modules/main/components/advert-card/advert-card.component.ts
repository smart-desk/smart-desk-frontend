import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AdvertResponse } from '../../../../shared/models/models.dto';
import { SectionType } from '../../../../shared/models/section.model';

@Component({
    selector: 'app-advert-card',
    templateUrl: './advert-card.component.html',
    styleUrls: ['./advert-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertCardComponent {
    @Input() advert: AdvertResponse;

    getPrice(): string {
        if (this.advert) {
            const priceSection = this.advert.sections.find(section => section.type === SectionType.PRICE);
            if (priceSection && priceSection.fields) {
                return priceSection.fields[0].value as string;
            }
            return '';
        }
    }
}
