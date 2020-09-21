import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AdvertResponse } from '../../../../shared/models/models.dto';

@Component({
    selector: 'app-adverts-list',
    templateUrl: './adverts-list.component.html',
    styleUrls: ['./adverts-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertsListComponent {
    @Input() adverts: AdvertResponse[];
}
