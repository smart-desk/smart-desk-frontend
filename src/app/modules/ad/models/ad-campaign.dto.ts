import { AdCampaignType } from './ad-campaign.entity';

export class AdCampaignDto {
    startDate: Date;
    endDate: Date;
    img: string;
    link: string;
    type: AdCampaignType;
}
