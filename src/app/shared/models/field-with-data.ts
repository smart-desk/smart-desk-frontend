import { Field } from './dto/field.entity';

export class FieldWithData<T> extends Field {
    params: T;
    constructor() {
        super();
    }
}
