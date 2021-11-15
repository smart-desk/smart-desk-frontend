import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AdService } from '../../modules/ad/ad.service';
import { createGoogleAdsenseElement } from '../../utils';
import { AppConfigService } from '../../modules/app-config/app-config.service';
import { AppConfigEntity } from '../../modules/app-config/models/app-config.entity';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
    appConfig: AppConfigEntity;

    constructor(private adService: AdService, private appConfigService: AppConfigService, private cd: ChangeDetectorRef) {
        this.adService.getAdConfig().subscribe(res => {
            if (res.adsense) {
                const elem = createGoogleAdsenseElement(res.adsense);
                document.getElementsByTagName('head')[0].appendChild(elem);
            }
        });

        this.appConfigService.getAppConfig().subscribe(res => {
            this.appConfig = res;
            this.cd.detectChanges();
        });
    }
}
