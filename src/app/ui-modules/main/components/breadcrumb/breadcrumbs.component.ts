import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export interface BreadcrumbStep {
    name: string;
    navigateUrl: string[];
}

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
    @Input() steps: BreadcrumbStep[] = [{ name: 'Главная', navigateUrl: ['/'] }];
}
