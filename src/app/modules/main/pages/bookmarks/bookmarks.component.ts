import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetAdvertsResponseDto } from '../../../shared/models/advert/advert.dto';
import { BookmarksStoreService } from '../../../shared/services/bookmarks/bookmarks-store.service';
import { UserService } from '../../../shared/services';
import { User } from '../../../shared/models/user/user.entity';
import { Bookmark } from '../../../shared/models/bookmarks/bookmark.entity';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarksComponent implements OnInit {
    user: User;
    advertDto: GetAdvertsResponseDto;

    constructor(private bookmarksStoreService: BookmarksStoreService, private cd: ChangeDetectorRef, private userService: UserService) {}

    ngOnInit(): void {
        this.bookmarksStoreService.loadBookmarks();

        this.userService.getCurrentUser().subscribe(res => {
            this.user = res;
            this.cd.detectChanges();
        });

        this.bookmarksStoreService.bookmarks$.subscribe(bookmarks => {
            this.advertDto = this.createGetAdvertResponse(bookmarks);
            this.cd.detectChanges();
        });
    }

    createBookmark(advertId: string) {
        this.bookmarksStoreService.createBookmark(advertId);
    }

    deleteBookmark(advertId) {
        this.bookmarksStoreService.deleteBookmark(advertId);
    }

    private createGetAdvertResponse(bookmarks: Bookmark[]): GetAdvertsResponseDto {
        if (!bookmarks) {
            return;
        }
        const getAdvertsResponseDto = new GetAdvertsResponseDto();
        getAdvertsResponseDto.adverts = bookmarks.map(bookmark => {
            bookmark.advert.isBookmark = true;
            return bookmark.advert;
        });

        return getAdvertsResponseDto;
    }
}
