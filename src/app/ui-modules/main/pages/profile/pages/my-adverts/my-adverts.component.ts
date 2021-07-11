import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetAdvertsResponseDto } from '../../../../../../modules/advert/models/advert.dto';
import { User } from '../../../../../../modules/user/models/user.entity';
import { ExtraActions } from '../../../../components/advert-card/advert-card.component';
import { Advert } from '../../../../../../modules/advert/models/advert.entity';
import { Router } from '@angular/router';
import { AdvertService } from '../../../../../../modules/advert/advert.service';
import { UserService } from '../../../../../../modules/user/user.service';
import { StripeService } from '../../../../../../modules/stripe/stripe.service';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
            title: 'Поднять',
            action: this.liftProduct.bind(this),
        },
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
        private router: Router,
        private stripeService: StripeService
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

    private liftProduct(product: Advert) {
        if (this.stripeService.stripe) {
            this.advertService
                .liftProduct(product.id)
                .pipe(switchMap(res => from(this.stripeService.stripe.redirectToCheckout({ sessionId: res.id }))))
                .subscribe(res => {
                    console.log(res);
                });
        }
    }
}
