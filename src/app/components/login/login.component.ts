import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, VKLoginProvider } from 'angularx-social-login';
import { fromPromise } from 'rxjs/internal-compatibility';
import { finalize, switchMap } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService, LoginResponse, UserService } from '../../services';
import { LoginService } from '../../services/login/login.service';

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
        private cd: ChangeDetectorRef,
        private loginService: LoginService
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
                finalize(() => this.modal.close())
            )
            .subscribe(res => this.handleLoginResponse(res));
    }

    vkLogin(): void {
        fromPromise(this.socialAuthService.signIn(VKLoginProvider.PROVIDER_ID))
            .pipe(
                switchMap(socialUser => this.authService.login('vk', socialUser.authToken)),
                finalize(() => this.modal.close())
            )
            .subscribe(res => this.handleLoginResponse(res));
    }

    private handleLoginResponse(res: LoginResponse) {
        if (res?.access_token) {
            localStorage.setItem('token', res.access_token);
            this.loginService.updateLoginInfo();
        } else {
            this.notificationService.error('Authorization failed', 'Try later');
        }
    }
}
