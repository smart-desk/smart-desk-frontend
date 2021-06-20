import { Advert } from '../../../services/advert/models/advert.entity';
import { User } from '../../../services/user/models/user.entity';

export class Chat {
    id: string;
    user1: string;
    user2: string;
    advertId: string;
    advertData: Advert;
    user1Data: User;
    user2Data: User;
    unreadMessagesCount: number;
}
