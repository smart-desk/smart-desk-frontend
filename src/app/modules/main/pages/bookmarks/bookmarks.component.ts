import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BookmarksService } from '../../../../shared/services/bookmarks/bookmarks.service';
import { GetAdvertsResponseDto } from '../../../../shared/models/dto/advert.dto';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarksComponent implements OnInit {
    advertDto = new GetAdvertsResponseDto();

    constructor(private bookmarksService: BookmarksService) {}

    ngOnInit(): void {
        this.bookmarksService
            .getUserBookmarks()
            .subscribe(bookmarks => (this.advertDto.adverts = bookmarks.map(bookmark => bookmark.advert)));
    }
}
