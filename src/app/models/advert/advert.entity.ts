import { FieldEntity } from '../field/field.entity';

export class Advert {
    id: string;
    // tslint:disable-next-line:variable-name
    category_id: string;
    // tslint:disable-next-line:variable-name
    model_id: string;
    title: string;
    userId: string;
    preferContact: string;
    createdAt: Date;
    updatedAt: Date;
    fields: FieldEntity[];
    isBookmark: boolean;
    views: number;
}
