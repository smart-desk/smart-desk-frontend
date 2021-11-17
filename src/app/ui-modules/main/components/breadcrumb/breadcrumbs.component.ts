import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';

export interface BreadcrumbsStep {
    name: string;
    navigateUrl: string[];
}

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnChanges {
    startStep: BreadcrumbsStep = { name: 'Главная', navigateUrl: ['/'] };
    resultSteps: BreadcrumbsStep[];
    @Input() steps: BreadcrumbsStep[] = [];

    ngOnChanges(): void {
        this.resultSteps = [this.startStep, ...this.steps];
    }
}
