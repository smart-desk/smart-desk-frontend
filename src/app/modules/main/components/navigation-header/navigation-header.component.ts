import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services';
import { LoginService } from '../../../../shared/services/login/login.service';
import { User } from '../../../../shared/models/dto/user.entity';

@Component({
    selector: 'app-navigation-header',
    templateUrl: './navigation-header.component.html',
    styleUrls: ['./navigation-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationHeaderComponent implements OnInit {
    user: User;

    constructor(private authService: AuthService, private loginService: LoginService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.loginService.login$.subscribe(user => {
            this.user = user;
            this.cd.detectChanges();
        });
    }
}
