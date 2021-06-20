import { Advert } from '../../advert/models/advert.entity';

export class Bookmark {
    id: string;
    userId: string;
    advertId: string;
    advert: Advert;
}
