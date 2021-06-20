import { InjectionToken } from '@angular/core';
import { AbstractFieldService } from './models/abstract-field.service';
import { FieldType } from '../../modules/field/models/field.entity';

/**
 * Contains corresponding field type and field service
 */
export type DynamicFieldsMapType = Map<FieldType, InjectionToken<AbstractFieldService>>;

export const DynamicFieldsMap: DynamicFieldsMapType = new Map();
