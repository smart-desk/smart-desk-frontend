import { Field } from './models.dto';

export class FieldWithData<T> extends Field {
    data: T;
    constructor() {
        super();
    }
}
