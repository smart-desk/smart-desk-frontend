import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { AdvertService, UserService } from '../../../../shared/services';
import { User } from '../../../../shared/models/dto/user/user.entity';
import { GetAdvertsResponseDto, GetAdvertsDto } from '../../../../shared/models/dto/advert.dto';
import { BookmarksStoreService } from '../../../../shared/services/bookmarks/bookmarks-store.service';
import { Bookmark } from '../../../../shared/models/dto/bookmarks/bookmark.entity';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
    user: User;
    advertResponse: GetAdvertsResponseDto;
    completedAdverts: GetAdvertsResponseDto;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private advertService: AdvertService,
        private cdr: ChangeDetectorRef,
        private bookmarkStoreService: BookmarksStoreService
    ) {}

    ngOnInit(): void {
        this.bookmarkStoreService.loadBookmarks();

        const userId = this.route.snapshot.paramMap.get('id');
        this.userService.getUser(userId).subscribe(res => {
            this.user = res;
            this.cdr.detectChanges();
        });

        const options = new GetAdvertsDto();
        options.user = userId;
        this.advertService.getAdverts(options).subscribe(res => {
            this.advertResponse = this.updateAdvertsWithBookmarks(res, this.bookmarkStoreService.bookmarks$.getValue());
            this.cdr.detectChanges();
        });

        this.advertService.getCompleted(options).subscribe(res => {
            this.completedAdverts = this.updateAdvertsWithBookmarks(res, this.bookmarkStoreService.bookmarks$.getValue());
            this.cdr.detectChanges();
        });

        // todo makes sense to reuse it in adverts.component
        this.bookmarkStoreService.bookmarks$.subscribe(bookmarks => {
            this.updateAdvertsWithBookmarks(this.advertResponse, bookmarks);
            this.updateAdvertsWithBookmarks(this.completedAdverts, bookmarks);
        });
    }

    createBookmark(advertId: string) {
        this.bookmarkStoreService.createBookmark(advertId);
    }

    deleteBookmark(advertId: string) {
        this.bookmarkStoreService.deleteBookmark(advertId);
    }

    private updateAdvertsWithBookmarks(advertsResponse: GetAdvertsResponseDto, bookmarks: Bookmark[]): GetAdvertsResponseDto {
        if (!advertsResponse) {
            return;
        }
        if (bookmarks) {
            advertsResponse.adverts.forEach(advert => {
                const bookmarkAdvert = bookmarks.find(bookmark => bookmark.advert.id === advert.id);
                advert.isBookmark = !!bookmarkAdvert;
            });
        }
        return cloneDeep(advertsResponse);
    }
}
