import { InjectionToken, Provider, Type } from '@angular/core';
import { DynamicFieldsMap } from './dynamic-fields.map';
import { AbstractFieldService } from './models/abstract-field.service';
import { FieldType } from '../../models/field/field.entity';

export function createDynamicFieldProvider(type: FieldType, useClass: Type<Partial<AbstractFieldService>>): Provider {
    DynamicFieldsMap.set(type, new InjectionToken<AbstractFieldService>(type));

    return { provide: DynamicFieldsMap.get(type), useClass };
}
