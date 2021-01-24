import { Advert } from '../advert.entity';

export class Bookmark {
    id: string;
    userId: string;
    advertId: string;
    advert: Advert;
}
