import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-saved',
    templateUrl: './saved.component.html',
    styleUrls: ['./saved.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
