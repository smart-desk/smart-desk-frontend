import { Inject, Injectable, Injector } from '@angular/core';
import { FieldType } from '../../models/dto/field.entity';
import { DynamicFieldsMap } from './dynamic-fields.module';
import { AbstractFieldService } from './abstract-field.service';

@Injectable({
    providedIn: 'root',
})
export class DynamicFieldsService {
    constructor(@Inject('FIELDS_MAP') private fieldsMap: DynamicFieldsMap, private injector: Injector) {}

    getService(type: FieldType): AbstractFieldService {
        return this.injector.get(this.fieldsMap.get(type));
    }
}
