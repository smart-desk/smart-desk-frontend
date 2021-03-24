import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GetAdvertsResponseDto } from '../../../../shared/models/advert/advert.dto';
import { ExtraActions } from '../advert-card/advert-card.component';

@Component({
    selector: 'app-adverts',
    templateUrl: './adverts.component.html',
    styleUrls: ['./adverts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertsComponent {
    @Input() advertsResponse: GetAdvertsResponseDto;
    @Input() showSearch = false;
    @Input() cardActions: ExtraActions[];
    @Output() changePage = new EventEmitter<number>();
    @Output() createBookmark = new EventEmitter<string>();
    @Output() deleteBookmark = new EventEmitter<string>();

    // todo: заглушка на метод поиска
    search($event: string) {}
}
