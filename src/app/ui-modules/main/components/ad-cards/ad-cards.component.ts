import { Component, OnInit } from '@angular/core';
import { AdService } from '../../../../modules/ad/ad.service';
import { AdCampaignType } from '../../../../modules/ad/models/ad-campaign.entity';

@Component({
    selector: 'app-ad-cards',
    templateUrl: './ad-cards.component.html',
    styleUrls: ['./ad-cards.component.scss'],
})
export class AdCardsComponent implements OnInit {
    constructor(private adSevice: AdService) {}

    ngOnInit(): void {
        this.adSevice.getAdCampaignsCurrent(AdCampaignType.MAIN).subscribe(cards => console.log('cards', cards));
    }
}
