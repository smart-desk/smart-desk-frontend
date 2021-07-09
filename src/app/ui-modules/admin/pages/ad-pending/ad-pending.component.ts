import { Component, OnInit } from '@angular/core';
import { AdCampaignComponent } from '../../classes/ad-campaign';
import { AdService } from '../../../../modules/ad/ad.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-ad-pending',
    templateUrl: './ad-pending.component.html',
    styleUrls: ['./ad-pending.component.scss'],
})
export class AdPendingComponent extends AdCampaignComponent implements OnInit {
    constructor(protected readonly adService: AdService, protected readonly modalService: NzModalService) {
        super(adService, modalService);
    }

    ngOnInit(): void {
        // todo: сделать enum
        this.getAd('pending');
    }
}
