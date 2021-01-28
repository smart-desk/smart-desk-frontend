import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Advert } from '../../../../shared/models/dto/advert.entity';
import { Bookmark } from '../../../../shared/models/dto/bookmarks/bookmark.entity';

@Component({
    selector: 'app-adverts-list',
    templateUrl: './adverts-list.component.html',
    styleUrls: ['./adverts-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertsListComponent implements OnInit {
    @Input() adverts: Advert[];
    @Input() bookmarks: Bookmark[];
    @Output() addBookmark = new EventEmitter<string>();

    ngOnInit() {
        this.adverts.forEach(advert => {
            const bookmarkAdvert = this.bookmarks.find(bookmark => bookmark.advert.id === advert.id);
            bookmarkAdvert ? (advert.isBookmark = true) : (advert.isBookmark = false);
        });
        this.clone();
    }

    clone() {
        this.adverts = [...this.adverts];
    }
}
