import { Component, Input, OnInit } from '@angular/core';
import { AdCampaignEntity } from '../../../../modules/ad/models/ad-campaign.entity';

@Component({
    selector: 'app-ad-cards',
    templateUrl: './ad-cards.component.html',
    styleUrls: ['./ad-cards.component.scss'],
})
export class AdCardsComponent implements OnInit {
    @Input() cards: AdCampaignEntity[];

    constructor() {}

    ngOnInit(): void {}
}
