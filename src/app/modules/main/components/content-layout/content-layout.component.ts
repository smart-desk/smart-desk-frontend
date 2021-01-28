import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-content-layout',
    templateUrl: './content-layout.component.html',
    styleUrls: ['./content-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentLayoutComponent {
    @Input()
    title: string;

    @Input()
    left: TemplateRef<any>;

    @Input()
    main: TemplateRef<any>;

    @Input()
    right: TemplateRef<any>;
}
