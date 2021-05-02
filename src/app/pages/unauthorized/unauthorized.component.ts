import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-unauthorized',
    templateUrl: 'unauthorized.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedComponent {}
