import { Inject, Injectable, Injector } from '@angular/core';
import { DynamicFieldsMapType } from './dynamic-fields.map';
import { AbstractFieldService } from './models/abstract-field.service';
import { FieldType } from '../../models/field/field.entity';

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
