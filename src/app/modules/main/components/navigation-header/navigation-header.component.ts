import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services';
import { LoginService } from '../../../shared/services/login/login.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../shared/models/user/user.entity';
import { ChatModalService } from '../../../shared/modules/chat/services/chat-modal.service';

@Component({
    selector: 'app-navigation-header',
    templateUrl: './navigation-header.component.html',
    styleUrls: ['./navigation-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationHeaderComponent implements OnInit, OnDestroy {
    user: User;
    destroy$ = new Subject();
    isAdmin: boolean;

    constructor(
        private authService: AuthService,
        private loginService: LoginService,
        private cd: ChangeDetectorRef,
        private chatModalService: ChatModalService
    ) {}

    ngOnInit() {
        this.loginService.login$.pipe(takeUntil(this.destroy$)).subscribe(user => {
            this.user = user;
            this.isAdmin = user?.roles.includes('admin');
            this.cd.detectChanges();
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openChat(): void {
        this.chatModalService.open();
    }
}
