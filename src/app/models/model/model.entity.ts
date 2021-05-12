import { FieldEntity } from '../field/field.entity';

export class Model {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    fields: FieldEntity[];
}
