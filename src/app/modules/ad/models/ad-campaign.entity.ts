export const SHORT_DATE_FORMAT = 'DD.MM.YYYY';

export enum AdCampaignType {
    MAIN = 'main',
    SIDEBAR = 'sidebar',
}

export enum AdCampaignStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    COMPLETED = 'completed',
    PAID = 'paid',
}

export class AdCampaignEntity {
    id: string;
    userId: string;
    startDate: string;
    endDate: string;
    img: string;
    link: string;
    type: AdCampaignType;
    status: AdCampaignStatus;
    reason: string;
}
