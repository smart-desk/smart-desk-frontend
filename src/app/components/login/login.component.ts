import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService, UserService } from '../../services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    loading = true;

    constructor(
        private socialAuthService: SocialAuthService,
        private authService: AuthService,
        private notificationService: NzNotificationService,
        private userService: UserService,
        private modal: NzModalRef,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.socialAuthService.initState.subscribe(initialized => {
            if (initialized) {
                this.loading = false;
                this.cd.detectChanges();
            }
        });
    }

    googleLogin(): void {
        fromPromise(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID))
            .pipe(
                switchMap(socialUser => this.authService.login('google', socialUser.idToken)),
                switchMap(res => {
                    if (res && res.access_token) {
                        // todo create a service for localstorage
                        localStorage.setItem('token', res.access_token);
                        return this.userService.getCurrentUser();
                    }

                    this.notificationService.error('Authorization failed', 'Try on more time later');
                    return of(null);
                })
            )
            .subscribe(res => this.modal.close());
    }
}
