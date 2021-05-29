import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-vk-redirect',
    templateUrl: './vk-redirect.component.html',
    styleUrls: ['./vk-redirect.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VkRedirectComponent {
    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
        const code = this.route.snapshot.queryParamMap.get('code');
        if (!code) {
            this.router.navigate(['/']);
            return;
        }

        this.authService.vkLogin(code).subscribe(res => {
            setTimeout(() => {
                window.opener.postMessage('vkAuthRes:' + String(res), environment.host);
            }, 1000);
        });
    }
}
