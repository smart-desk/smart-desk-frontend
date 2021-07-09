import { Component, OnInit } from '@angular/core';
import { AdCampaignComponent } from '../../classes/ad-campaign';
import { AdService } from '../../../../modules/ad/ad.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-ad-reject',
    templateUrl: './ad-reject.component.html',
    styleUrls: ['./ad-reject.component.scss'],
})
export class AdRejectComponent extends AdCampaignComponent implements OnInit {
    constructor(protected readonly adService: AdService, protected readonly modalService: NzModalService) {
        super(adService, modalService);
    }

    ngOnInit(): void {
        // todo: сделать enum
        this.getAd('reject');
    }
}
