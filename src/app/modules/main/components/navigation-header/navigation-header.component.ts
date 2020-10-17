import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-navigation-header',
    templateUrl: './navigation-header.component.html',
    styleUrls: ['./navigation-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationHeaderComponent {
    constructor(private modalService: NzModalService) {}

    openLoginModal(): void {
        const loginModal = this.modalService.create({
            nzTitle: 'Войти на сайт',
            nzContent: LoginComponent,
        });
    }
}
