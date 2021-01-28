import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GetAdvertsResponseDto } from '../../../../shared/models/dto/advert.dto';
import { Bookmark } from '../../../../shared/models/dto/bookmarks/bookmark.entity';

@Component({
    selector: 'app-adverts',
    templateUrl: './adverts.component.html',
    styleUrls: ['./adverts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertsComponent {
    @Input() advertsResponse: GetAdvertsResponseDto;
    @Input() bookmarks: Bookmark[];
    @Input() showSearch = false;
    @Output() changePage = new EventEmitter<number>();
    @Output() addBookmark = new EventEmitter<string>();

    // todo: заглушка на метод поиска
    search($event: string) {}
}
