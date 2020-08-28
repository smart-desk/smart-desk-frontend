import { Directive, Input } from '@angular/core';
import { FieldWithData } from '../../models/field-with-data';
import { AdvertFieldBase } from '../../models/models.dto';

interface AdvertField {
    getValue(): AdvertFieldBase;
}

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class FieldFormComponent<T> implements AdvertField {
    @Input() field: FieldWithData<T>;
    @Input() preview: boolean;
    @Input() advertField: AdvertFieldBase;

    abstract getValue(): AdvertFieldBase;
}
