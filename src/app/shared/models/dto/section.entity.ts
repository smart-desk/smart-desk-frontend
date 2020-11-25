import { FieldEntity } from './field.entity';

export enum SectionType {
    PARAMS = 'params',
    CONTACTS = 'contacts',
    LOCATION = 'location',
    PRICE = 'price',
}

export class Section {
    id: string;
    type: SectionType;
    // tslint:disable-next-line:variable-name
    model_id: string;
    fields: FieldEntity[];
}
