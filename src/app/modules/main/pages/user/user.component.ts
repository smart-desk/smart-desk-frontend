import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { AdvertService, UserService } from '../../../../shared/services';
import { User } from '../../../../shared/models/user/user.entity';
import { GetAdvertsResponseDto, GetAdvertsDto } from '../../../../shared/models/advert/advert.dto';
import { BookmarksStoreService } from '../../../../shared/services/bookmarks/bookmarks-store.service';
import { Bookmark } from '../../../../shared/models/bookmarks/bookmark.entity';

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
    }

    createBookmark(advertId: string) {
        this.bookmarkStoreService.createBookmark(advertId);
    }

    deleteBookmark(advertId: string) {
        this.bookmarkStoreService.deleteBookmark(advertId);
    }
}
