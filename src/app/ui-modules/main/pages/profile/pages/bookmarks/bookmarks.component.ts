import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetAdvertsResponseDto } from '../../../../../../modules/advert/models/advert.dto';
import { BookmarksStoreService } from '../../../../../../modules/bookmarks/bookmarks-store.service';
import { User } from '../../../../../../modules/user/models/user.entity';
import { Bookmark } from '../../../../../../modules/bookmarks/models/bookmark.entity';
import { UserService } from '../../../../../../modules/user/user.service';

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
        getAdvertsResponseDto.products = bookmarks.map(bookmark => {
            bookmark.product.isBookmark = true;
            return bookmark.product;
        });

        return getAdvertsResponseDto;
    }
}