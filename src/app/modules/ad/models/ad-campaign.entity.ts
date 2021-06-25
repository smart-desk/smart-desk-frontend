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

export class AdCampaign {
    id: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    img: string;
    link: string;
    type: AdCampaignType;
    status: AdCampaignStatus;
    reason: string;
}
