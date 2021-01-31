import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetAdvertsResponseDto } from '../../../../shared/models/dto/advert.dto';
import { BookmarksStoreService } from '../../../../shared/services/bookmarks/bookmarks-store.service';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarksComponent implements OnInit {
    advertDto: GetAdvertsResponseDto;

    constructor(private bookmarksStoreService: BookmarksStoreService, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.bookmarksStoreService.bookmarks$.subscribe(bookmarks => {
            this.advertDto = new GetAdvertsResponseDto();
            this.advertDto.adverts = bookmarks.map(bookmark => {
                bookmark.advert.isBookmark = true;
                return bookmark.advert;
            });
            this.cd.detectChanges();
        });
    }

    createBookmark(advertId: string) {
        this.bookmarksStoreService.createBookmark(advertId);
    }

    deleteBookmark(advertId) {
        this.bookmarksStoreService.deleteBookmark(advertId);
    }
}
