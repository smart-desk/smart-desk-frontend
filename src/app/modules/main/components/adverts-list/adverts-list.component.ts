import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Advert } from '../../../../shared/models/dto/advert.entity';

@Component({
    selector: 'app-adverts-list',
    templateUrl: './adverts-list.component.html',
    styleUrls: ['./adverts-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertsListComponent {
    @Input() adverts: Advert[];
}
