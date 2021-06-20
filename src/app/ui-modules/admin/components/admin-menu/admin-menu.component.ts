import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMenuComponent {}
