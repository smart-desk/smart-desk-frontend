import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, VKLoginProvider } from 'angularx-social-login';
import { fromPromise } from 'rxjs/internal-compatibility';
import { finalize, switchMap } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService, UserService } from '../../services';
import { LoginService } from '../../services/login/login.service';
import { environment } from '../../../environments/environment';

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
                switchMap(socialUser => this.authService.googleLogin(socialUser.idToken)),
                finalize(() => this.modal.close())
            )
            .subscribe(res => {
                if (res) {
                    this.loginService.updateLoginInfo();
                } else {
                    this.notificationService.error('Authorization failed', 'Try later');
                }
            });
    }

    vkLogin(): void {
        const windowOpened = window.open(
            `https://oauth.vk.com/authorize?client_id=${environment.vkAppId}&redirect_uri=${environment.host}/vk/redirect&response_type=code&v=5.131`
        );

        const authResult = (event: MessageEvent) => {
            if (typeof event.data === 'string' && event.data.startsWith('vkAuthRes')) {
                const result = event.data.split(':')[1];

                if (windowOpened) {
                    windowOpened.close();
                }

                if (result === 'true') {
                    this.loginService.updateLoginInfo();
                } else {
                    this.notificationService.error('Authorization failed', 'Try later');
                }

                this.modal.close();
            }
        };

        window.addEventListener('message', authResult, false);
    }
}
