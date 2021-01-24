import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
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
    activeAdvertsResponse: GetAdvertsResponseDto;
    blockedAdvertsResponse: GetAdvertsResponseDto;
    pendingAdvertsResponse: GetAdvertsResponseDto;
    completedAdvertsResponse: GetAdvertsResponseDto;
    user: User;

    constructor(private advertService: AdvertService, private cdr: ChangeDetectorRef, private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(res => {
            this.user = res;
            this.cdr.detectChanges();
        });
        this.getAdverts();
    }

    getAdverts(): void {
        zip(
            this.advertService.getMyAdverts(),
            this.advertService.getPending(),
            this.advertService.getBlocked(),
            this.advertService.getCompleted()
        ).subscribe(([active, pending, blocked, completed]) => {
            this.activeAdvertsResponse = active;
            this.pendingAdvertsResponse = pending;
            this.blockedAdvertsResponse = blocked;
            this.completedAdvertsResponse = completed;
            this.cdr.detectChanges();
        });
    }
}
