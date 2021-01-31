import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GetAdvertsResponseDto } from '../../../../shared/models/dto/advert.dto';

@Component({
    selector: 'app-adverts',
    templateUrl: './adverts.component.html',
    styleUrls: ['./adverts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertsComponent {
    @Input() advertsResponse: GetAdvertsResponseDto;
    @Input() showSearch = false;
    @Output() changePage = new EventEmitter<number>();
    @Output() addBookmark = new EventEmitter<string>();
    @Output() removeBookmark = new EventEmitter<string>();

    // todo: заглушка на метод поиска
    search($event: string) {}
}
