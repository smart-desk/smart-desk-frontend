import { Field } from './models.dto';

export class FieldWithData<T> extends Field {
    params: T;
    constructor() {
        super();
    }
}
