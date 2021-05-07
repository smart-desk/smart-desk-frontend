import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetAdvertsDto, GetAdvertsResponseDto } from '../../../../models/advert/advert.dto';
import { BookmarksStoreService } from '../../../../services/bookmarks/bookmarks-store.service';
import { User } from '../../../../models/user/user.entity';
import { AdvertService, UserService } from '../../../../services';

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
        if (this.route.snapshot.paramMap.has('id')) {
            const userId = this.route.snapshot.paramMap.get('id') as string;
            this.userService.getUser(userId).subscribe(res => {
                this.user = res;
                this.cdr.detectChanges();
            });

            const options = new GetAdvertsDto();
            options.user = userId;
        }
    }

    createBookmark(advertId: string) {
        this.bookmarkStoreService.createBookmark(advertId);
    }

    deleteBookmark(advertId: string) {
        this.bookmarkStoreService.deleteBookmark(advertId);
    }
}
