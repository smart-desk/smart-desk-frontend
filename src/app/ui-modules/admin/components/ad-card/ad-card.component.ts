import { Component, Input, OnInit } from '@angular/core';
import { AdCampaignEntity } from '../../../../modules/ad/models/ad-campaign.entity';

@Component({
    selector: 'app-ad-card',
    templateUrl: './ad-card.component.html',
    styleUrls: ['./ad-card.component.scss'],
})
export class AdCardComponent implements OnInit {
    thumb = '';
    link = '';
    @Input() ad: AdCampaignEntity;
    constructor() {}

    ngOnInit(): void {
        this.link = this.ad?.link;
        this.thumb = this.ad?.img;
    }
}
