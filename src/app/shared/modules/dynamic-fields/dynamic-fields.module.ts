import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType } from '../../models/dto/field.entity';
import { AbstractFieldService } from './abstract-field.service';
import { InputTextModule } from '../../../modules/dynamic-fields/input-text/input-text.module';
import { InputTextService } from '../../../modules/dynamic-fields/input-text/input-text.service';
import { RadioService } from '../../../modules/dynamic-fields/radio/radio.service';
import { TextService } from '../../../modules/dynamic-fields/text/text.service';
import { TextareaService } from '../../../modules/dynamic-fields/textarea/textarea.service';
import { TextareaModule } from '../../../modules/dynamic-fields/textarea/textarea.module';
import { RadioModule } from '../../../modules/dynamic-fields/radio/radio.module';
import { TextModule } from '../../../modules/dynamic-fields/text/text.module';

/**
 * Contains corresponding field type and field service
 */
export type DynamicFieldsMap = Map<FieldType, InjectionToken<AbstractFieldService>>;

const dynamicFields: DynamicFieldsMap = new Map();
/**
 * Register token for field type below
 */
dynamicFields.set(FieldType.INPUT_TEXT, new InjectionToken(FieldType.INPUT_TEXT));
dynamicFields.set(FieldType.RADIO, new InjectionToken(FieldType.RADIO));
dynamicFields.set(FieldType.TEXT, new InjectionToken(FieldType.TEXT));
dynamicFields.set(FieldType.TEXTAREA, new InjectionToken(FieldType.TEXTAREA));

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
        {
            provide: dynamicFields.get(FieldType.RADIO),
            useClass: RadioService,
        },
        {
            provide: dynamicFields.get(FieldType.TEXT),
            useClass: TextService,
        },
        {
            provide: dynamicFields.get(FieldType.TEXTAREA),
            useClass: TextareaService,
        },
    ],
    imports: [CommonModule, InputTextModule, TextareaModule, RadioModule, TextModule],
})
export class DynamicFieldsModule {}
