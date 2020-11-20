import { Inject, Injectable, Injector } from '@angular/core';
import { FieldType } from '../../models/dto/field.entity';
import { DynamicFieldsMapType } from './dynamic-fields.map';
import { AbstractFieldService } from './abstract-field.service';

@Injectable({
    providedIn: 'root',
})
export class DynamicFieldsService {
    constructor(@Inject('FIELDS_MAP') private fieldsMap: DynamicFieldsMapType, private injector: Injector) {}

    getService(type: FieldType): AbstractFieldService {
        if (this.fieldsMap.get(type)) {
            return this.injector.get(this.fieldsMap.get(type));
        }
    }
}
