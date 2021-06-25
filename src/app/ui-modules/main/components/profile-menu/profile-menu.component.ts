import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { User } from '../../../../modules/user/models/user.entity';
import { LoginService } from '../../../../modules/login/login.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../../../../modules/user/user.service';
import { AdService } from '../../../../modules/ad-campaign/ad-campaign.service';

@Component({
    selector: 'app-profile-menu',
    templateUrl: './profile-menu.component.html',
    styleUrls: ['./profile-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
    user: User | undefined;
    destroy$ = new Subject();
    hasAdConfig: boolean;

    constructor(
        private modalService: NzModalService,
        private userService: UserService,
        private cd: ChangeDetectorRef,
        private loginService: LoginService,
        private readonly adService: AdService
    ) {}

    ngOnInit(): void {
        this.loginService.login$.pipe(takeUntil(this.destroy$)).subscribe(user => {
            this.user = user;
            this.cd.detectChanges();
        });

        this.adService.getAdConfig().subscribe(adConfig => {
            this.hasAdConfig = !!adConfig;
            this.cd.detectChanges();
        });
    }

    logout(): void {
        this.loginService.logout();
    }

    openLoginModal(): void {
        this.loginService.openLoginModal();
    }

    ngOnDestroy() {
        this.destroy$.next(null);
        this.destroy$.complete();
    }
}
