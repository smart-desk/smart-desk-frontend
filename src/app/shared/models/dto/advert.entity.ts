import { Section } from './section.entity';

export class Advert {
    id: string;
    // tslint:disable-next-line:variable-name
    category_id: string;
    // tslint:disable-next-line:variable-name
    model_id: string;
    title: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    sections: Section[];
}
