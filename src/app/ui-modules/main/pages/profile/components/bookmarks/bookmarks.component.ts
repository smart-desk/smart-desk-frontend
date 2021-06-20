import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetAdvertsResponseDto } from '../../../../../../modules/advert/models/advert.dto';
import { BookmarksStoreService } from '../../../../../../modules/bookmarks/bookmarks-store.service';
import { UserService } from '../../../../../../modules';
import { User } from '../../../../../../modules/user/models/user.entity';
import { Bookmark } from '../../../../../../modules/bookmarks/models/bookmark.entity';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarksComponent implements OnInit {
    user: User;
    advertDto: GetAdvertsResponseDto | null;

    constructor(private bookmarksStoreService: BookmarksStoreService, private cd: ChangeDetectorRef, private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(res => {
            this.user = res;
            this.cd.detectChanges();
        });

        this.bookmarksStoreService.bookmarks$.subscribe(bookmarks => {
            this.advertDto = this.createGetAdvertResponse(bookmarks);
            this.cd.detectChanges();
        });
    }

    private createGetAdvertResponse(bookmarks: Bookmark[]): GetAdvertsResponseDto | null {
        if (!bookmarks) {
            return null;
        }
        const getAdvertsResponseDto = new GetAdvertsResponseDto();
        getAdvertsResponseDto.adverts = bookmarks.map(bookmark => {
            bookmark.advert.isBookmark = true;
            return bookmark.advert;
        });

        return getAdvertsResponseDto;
    }
}
