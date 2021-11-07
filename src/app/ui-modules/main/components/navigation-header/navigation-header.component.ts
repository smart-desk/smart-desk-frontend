import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../../../modules/login/login.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../../modules/user/models/user.entity';
import { ChatModalService } from '../../../chat/services/chat-modal.service';
import { AuthService } from '../../../../modules/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation-header',
    templateUrl: './navigation-header.component.html',
    styleUrls: ['./navigation-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationHeaderComponent implements OnInit, OnDestroy {
    user: User | undefined;
    destroy$ = new Subject();

    constructor(
        private authService: AuthService,
        private loginService: LoginService,
        private cd: ChangeDetectorRef,
        private chatModalService: ChatModalService,
        private router: Router
    ) {}

    get isAdmin(): boolean | undefined {
        return this.user?.roles.includes('admin');
    }

    ngOnInit() {
        this.loginService.login$.pipe(takeUntil(this.destroy$)).subscribe(user => {
            this.user = user;
            this.cd.detectChanges();
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openChat(): void {
        if (this.user) {
            this.chatModalService.open();
        } else {
            this.loginService.openLoginModal(this.openChatAfterRedirect.bind(this));
        }
    }

    openChatAfterRedirect() {
        this.chatModalService.open();
    }

    openBookmarks() {
        if (this.user) {
            this.navigateToBookmarks();
        } else {
            this.loginService.openLoginModal(this.navigateToBookmarks.bind(this));
        }
    }

    navigateToBookmarks(): void {
        this.router.navigate(['profile', 'bookmarks']);
    }
}
