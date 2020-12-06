import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services';

@Component({
    selector: 'app-navigation-header',
    templateUrl: './navigation-header.component.html',
    styleUrls: ['./navigation-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationHeaderComponent implements OnInit {
    isAuth: boolean;

    constructor(public authService: AuthService) {}

    ngOnInit(): void {
        this.authService.isLoggedIn().subscribe(bool => (this.isAuth = bool));
    }
}
