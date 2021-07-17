import { AdCampaignType } from './ad-campaign.entity';

export class AdCampaignDto {
    title: string;
    startDate: string;
    endDate: string;
    img: string;
    link: string;
    type: AdCampaignType;
}
