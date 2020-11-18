import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AdvertsGetResponseDto } from '../../../../shared/models/dto/advert.dto';

@Component({
    selector: 'app-adverts-list',
    templateUrl: './adverts-list.component.html',
    styleUrls: ['./adverts-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertsListComponent {
    @Input() adverts: AdvertsGetResponseDto[];
}
