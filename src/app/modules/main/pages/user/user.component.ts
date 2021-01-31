import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AdvertService, UserService } from '../../../../shared/services';
import { User } from '../../../../shared/models/dto/user/user.entity';
import { GetAdvertsResponseDto, GetAdvertsDto } from '../../../../shared/models/dto/advert.dto';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
    user: User;
    advertResponse: GetAdvertsResponseDto;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private advertService: AdvertService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const userId = this.route.snapshot.paramMap.get('id');
        this.userService
            .getUser(userId)
            .pipe(
                switchMap(user => {
                    this.user = user;
                    this.cdr.detectChanges();
                    const options = new GetAdvertsDto();
                    options.user = user.id;
                    return this.advertService.getAdverts(options);
                })
            )
            .subscribe(res => {
                this.advertResponse = res;
                this.cdr.detectChanges();
            });
    }

    addBookmark($event) {
        console.log('Заглушка');
    }
}
