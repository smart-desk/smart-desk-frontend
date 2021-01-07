import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile-side-bar',
    templateUrl: './profile-side-bar.component.html',
    styleUrls: ['./profile-side-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSideBarComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
