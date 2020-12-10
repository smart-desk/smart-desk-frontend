import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services';
import { LoginService } from '../../../../shared/services/login/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation-header',
    templateUrl: './navigation-header.component.html',
    styleUrls: ['./navigation-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationHeaderComponent {
    constructor(private authService: AuthService, private loginService: LoginService, private router: Router) {}

    checkRightAdmin() {
        this.authService.isLoggedIn().subscribe(isAuth => {
            // TODO: add check on the "Admin" flag
            if (isAuth) {
                return this.router.navigate(['/admin']);
            }
            return this.loginService.openLoginModal();
        });
    }
}
