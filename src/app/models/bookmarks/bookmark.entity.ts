import { Advert } from '../advert/advert.entity';

export class Bookmark {
    id: string;
    userId: string;
    advertId: string;
    advert: Advert;
}
