import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdvertService, UserService } from '../../../../shared/services';
import { GetAdvertsResponseDto } from '../../../../shared/models/dto/advert.dto';
import { User } from '../../../../shared/models/dto/user/user.entity';

@Component({
    selector: 'app-my-adverts',
    templateUrl: './my-adverts.component.html',
    styleUrls: ['./my-adverts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAdvertsComponent implements OnInit {
    adverts: GetAdvertsResponseDto;
    user: User;

    constructor(private advertService: AdvertService, private cdr: ChangeDetectorRef, private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(res => {
            this.user = res;
            this.cdr.detectChanges();
        });

        this.advertService.getMyAdverts().subscribe(res => {
            this.adverts = res;
            this.cdr.detectChanges();
        });
    }
}
