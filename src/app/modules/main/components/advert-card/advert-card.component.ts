import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Advert } from '../../../../shared/models/dto/advert.entity';

@Component({
    selector: 'app-advert-card',
    templateUrl: './advert-card.component.html',
    styleUrls: ['./advert-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertCardComponent {
    @Input() advert: Advert;
}
