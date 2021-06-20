import { FieldEntity } from '../../field/models/field.entity';

export class Model {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    fields: FieldEntity[];
}
