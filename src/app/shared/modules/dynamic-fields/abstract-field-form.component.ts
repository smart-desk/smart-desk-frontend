import { Directive, Input } from '@angular/core';
import { Field } from '../../models/dto/field.entity';

interface AdvertField {
    getValue(): unknown; // todo and rename
    isValid(): boolean;
}

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldFormComponent<T> implements AdvertField {
    @Input() field: Field;
    @Input() preview: boolean;
    @Input() data: any; // todo

    abstract getValue(): any; // todo
    abstract isValid(): boolean;
}
