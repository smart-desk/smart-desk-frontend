import { Advert } from '../../../models/advert/advert.entity';
import { User } from '../../../models/user/user.entity';

export class Chat {
    id: string;
    user1: string;
    user2: string;
    advertId: string;
    advertData: Advert;
    user1Data: User;
    user2Data: User;
}
