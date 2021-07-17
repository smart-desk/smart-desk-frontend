import { AdCampaignType } from './ad-campaign.entity';

export class AdCampaignDto {
    startDate: string;
    endDate: string;
    img: string;
    link: string;
    type: AdCampaignType;
}
