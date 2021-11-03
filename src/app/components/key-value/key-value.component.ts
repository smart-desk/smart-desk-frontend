import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-key-value',
    templateUrl: './key-value.component.html',
    styleUrls: ['./key-value.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyValueComponent {
    @Input()
    key: string;

    @Input()
    value: string | number;

    @Input()
    safeValue: boolean;
}
