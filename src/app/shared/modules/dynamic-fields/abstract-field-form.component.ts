import { Directive, Input } from '@angular/core';
import { FieldWithData } from '../../models/field-with-data';
import { TextareaDto } from '../../models/dto/field-params/textarea.dto';
import { RadioDto } from '../../models/dto/field-params/radio.dto';
import { TextDto } from '../../models/dto/field-params/text.dto';
import { InputTextDto } from '../../models/dto/field-params/input-text.dto';

interface AdvertField {
    getValue(): unknown; // todo and rename
    isValid(): boolean;
}

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractFieldFormComponent<T> implements AdvertField {
    @Input() field: FieldWithData<InputTextDto | TextareaDto | RadioDto | TextDto>;
    @Input() preview: boolean;
    @Input() data: any; // todo

    abstract getValue(): any; // todo
    abstract isValid(): boolean;
}
