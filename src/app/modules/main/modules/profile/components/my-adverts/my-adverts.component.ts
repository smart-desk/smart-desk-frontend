import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdvertService, UserService } from '../../../../../../services';
import { GetAdvertsResponseDto } from '../../../../../../models/advert/advert.dto';
import { User } from '../../../../../../models/user/user.entity';
import { ExtraActions } from '../../../../components/advert-card/advert-card.component';
import { Advert } from '../../../../../../models/advert/advert.entity';
import { Router } from '@angular/router';

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

    activeAdvertsActions: ExtraActions[] = [
        {
            title: 'Завершить',
            action: this.completeAdvert.bind(this),
        },
        {
            title: 'Редактировать',
            action: this.editAdvert.bind(this),
        },
        {
            title: 'Удалить',
            action: this.deleteAdvert.bind(this),
        },
    ];

    completedAdvertsActions: ExtraActions[] = [
        {
            title: 'Удалить',
            action: this.deleteAdvert.bind(this),
        },
    ];

    pendingAdvertsActions: ExtraActions[] = [
        {
            title: 'Удалить',
            action: this.deleteAdvert.bind(this),
        },
    ];

    blockedAdvertsActions: ExtraActions[] = [
        {
            title: 'Удалить',
            action: this.deleteAdvert.bind(this),
        },
    ];

    constructor(
        private advertService: AdvertService,
        private cdr: ChangeDetectorRef,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(res => {
            this.user = res;
            this.cdr.detectChanges();
        });
        this.getAdverts();
    }

    getAdverts() {
        this.getActiveAdverts();
        this.getPendingAdverts();
        this.getBlockedAdverts();
        this.getCompletedAdverts();
    }

    private getActiveAdverts() {
        this.advertService.getMyAdverts().subscribe(res => {
            this.activeAdvertsResponse = res;
            this.cdr.detectChanges();
        });
    }

    private getPendingAdverts() {
        this.advertService.getPending().subscribe(res => {
            this.pendingAdvertsResponse = res;
            this.cdr.detectChanges();
        });
    }

    private getBlockedAdverts() {
        this.advertService.getBlocked().subscribe(res => {
            this.blockedAdvertsResponse = res;
            this.cdr.detectChanges();
        });
    }

    private getCompletedAdverts() {
        this.advertService.getCompleted().subscribe(res => {
            this.completedAdvertsResponse = res;
            this.cdr.detectChanges();
        });
    }

    private completeAdvert(advert: Advert) {
        this.advertService.completeAdvert(advert.id).subscribe(() => {
            this.getAdverts();
        });
    }

    private editAdvert(advert: Advert) {
        this.router.navigate(['adverts', advert.id, 'edit']);
    }

    private deleteAdvert(advert: Advert) {
        this.advertService.deleteAdvert(advert.id).subscribe(() => {
            this.getAdverts();
        });
    }
}
