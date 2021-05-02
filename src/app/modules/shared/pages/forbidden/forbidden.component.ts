import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-forbidden',
    templateUrl: 'forbidden.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForbiddenComponent {}
