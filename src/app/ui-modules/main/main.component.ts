import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdService } from '../../modules/ad/ad.service';
import { createGoogleAdsenseElement } from '../../utils';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
    constructor(private adService: AdService) {
        this.adService.getAdConfig().subscribe(res => {
            if (res.adsense) {
                const elem = createGoogleAdsenseElement(res.adsense);
                document.getElementsByTagName('head')[0].appendChild(elem);
            }
        });
    }
}
