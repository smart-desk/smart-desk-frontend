import { FieldEntity } from './field.entity';

export class Field<TData, TParams> extends FieldEntity {
    data: TData;
    params: TParams;
}
