import { Advert } from '../../../modules/advert/models/advert.entity';
import { User } from '../../../modules/user/models/user.entity';

export class Chat {
    id: string;
    user1: string;
    user2: string;
    productId: string;
    productData: Advert;
    user1Data: User;
    user2Data: User;
    unreadMessagesCount: number;
}
