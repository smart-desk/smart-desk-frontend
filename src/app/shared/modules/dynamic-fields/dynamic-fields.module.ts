import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType } from '../../models/dto/field.entity';
import { AbstractFieldService } from './abstract-field.service';
import { InputTextModule } from '../../../modules/dynamic-fields/input-text/input-text.module';
import { InputTextService } from '../../../modules/dynamic-fields/input-text/input-text.service';

/**
 * Contains corresponding field type and field service
 */
export type DynamicFieldsMap = Map<FieldType, InjectionToken<AbstractFieldService>>;

const dynamicFields: DynamicFieldsMap = new Map();

/**
 * Register token for field type below
 * @example
 * ```
 * dynamicFields.set(FieldType.INPUT_TEXT, new InjectionToken(FieldType.INPUT_TEXT))
 * ```
 *
 * ```
 * {
 *     provide: dynamicFields.get(FieldType.INPUT_TEXT)
 *     useClass: InputTextService // must extends AbstractFieldService
 * }
 * ```
 */
// todo useClass: InputTextService // must extends AbstractFieldService
dynamicFields.set(FieldType.INPUT_TEXT, new InjectionToken(FieldType.INPUT_TEXT));

@NgModule({
    declarations: [],
    providers: [
        {
            provide: 'FIELDS_MAP',
            useValue: dynamicFields,
        },
        {
            provide: dynamicFields.get(FieldType.INPUT_TEXT),
            useClass: InputTextService,
        },
    ],
    imports: [CommonModule, InputTextModule],
})
export class DynamicFieldsModule {}
