import { FieldEntity } from './dto/field.entity';

export class Field<T, K> extends FieldEntity {
    data: T;
    params: K;
}
