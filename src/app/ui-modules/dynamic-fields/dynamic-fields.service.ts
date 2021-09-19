import { Inject, Injectable, Injector, Type } from '@angular/core';
import { DynamicFieldsMapType } from './dynamic-fields.map';
import { AbstractFieldService } from './models/abstract-field.service';
import { FieldType } from '../../modules/field/models/field.entity';

@Injectable({
    providedIn: 'root',
})
export class DynamicFieldsService {
    constructor(@Inject('FIELDS_MAP') private fieldsMap: DynamicFieldsMapType, private injector: Injector) {}

    getService(type: FieldType): AbstractFieldService | undefined {
        if (this.fieldsMap.get(type)) {
            return this.injector.get(this.fieldsMap.get(type));
        }
        return;
    }
}
