import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';
import { AuthService, UserService } from '../../../../shared/services';

// todo make it independent component
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    constructor(
        private socialAuthService: SocialAuthService,
        private authService: AuthService,
        private notificationService: NzNotificationService,
        private userService: UserService
    ) {}

    googleLogin(): void {
        fromPromise(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID))
            .pipe(
                switchMap(socialUser => this.authService.login('google', socialUser.idToken)),
                switchMap(res => {
                    if (res && res.access_token) {
                        // todo create a service for localstorage
                        localStorage.setItem('token', res.access_token);
                        return this.userService.getProfile();
                    }

                    this.notificationService.error('Authorization failed', 'Try on more time later');
                    return of(null);
                })
            )
            .subscribe(res => {
                console.log(res);
            });
    }
}
