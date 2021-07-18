import { AdCampaignType } from './ad-campaign.entity';

export interface AdCampaignCurrentDto {
    title: string;
    img: string;
    link: string;
    type: AdCampaignType;
}
