import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { fromPromise } from 'rxjs/internal-compatibility';
import { AuthService } from '../../../../shared/services';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    constructor(private socialAuthService: SocialAuthService, private authService: AuthService) {}

    googleLogin(): void {
        fromPromise(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID))
            .pipe(switchMap(socialUser => this.authService.login('google', socialUser.idToken)))
            .subscribe(res => console.log(res));
    }
}
