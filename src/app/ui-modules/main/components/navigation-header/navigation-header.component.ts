import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../../../modules/login/login.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../../modules/user/models/user.entity';
import { ChatModalService } from '../../../chat/services/chat-modal.service';
import { AuthService } from '../../../../modules/auth/auth.service';

@Component({
    selector: 'app-navigation-header',
    templateUrl: './navigation-header.component.html',
    styleUrls: ['./navigation-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationHeaderComponent implements OnInit, OnDestroy {
    user: User | undefined;
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
            if (user?.roles) {
                this.isAdmin = user?.roles.includes('admin');
                this.cd.detectChanges();
            }
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
