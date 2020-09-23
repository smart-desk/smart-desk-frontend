import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {}
