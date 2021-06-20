import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../services';
import { User } from '../../../../services/user/models/user.entity';
import { LoginService } from '../../../../services/login/login.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-profile-menu',
    templateUrl: './profile-menu.component.html',
    styleUrls: ['./profile-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
    user: User | undefined;
    destroy$ = new Subject();

    constructor(
        private modalService: NzModalService,
        private userService: UserService,
        private cd: ChangeDetectorRef,
        private loginService: LoginService
    ) {}

    ngOnInit(): void {
        this.loginService.login$.pipe(takeUntil(this.destroy$)).subscribe(user => {
            this.user = user;
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
