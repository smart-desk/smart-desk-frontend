import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
    @Input()
    path: string;

    @Input()
    size: 'sm' | 'lg' = 'lg';

    constructor(private router: Router) {}

    navigateToMain(): void {
        this.router.navigate(['/']);
    }
}
