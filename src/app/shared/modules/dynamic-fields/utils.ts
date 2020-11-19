import { FieldType } from '../../models/dto/field.entity';
import { InjectionToken, Provider } from '@angular/core';
import { DynamicFieldsMap } from './dynamic-fields.map';
import { AbstractFieldService } from './abstract-field.service';

export function createDynamicFieldProvider(type: FieldType, useClass): Provider {
    DynamicFieldsMap.set(type, new InjectionToken<AbstractFieldService>(type));

    return { provide: DynamicFieldsMap.get(type), useClass };
}
