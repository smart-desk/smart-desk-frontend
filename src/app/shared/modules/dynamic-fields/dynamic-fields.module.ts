import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType } from '../../models/dto/field.entity';
import { InputTextModule } from '../../../modules/dynamic-fields/input-text/input-text.module';
import { InputTextService } from '../../../modules/dynamic-fields/input-text/input-text.service';
import { RadioService } from '../../../modules/dynamic-fields/radio/radio.service';
import { TextService } from '../../../modules/dynamic-fields/text/text.service';
import { TextareaService } from '../../../modules/dynamic-fields/textarea/textarea.service';
import { TextareaModule } from '../../../modules/dynamic-fields/textarea/textarea.module';
import { RadioModule } from '../../../modules/dynamic-fields/radio/radio.module';
import { TextModule } from '../../../modules/dynamic-fields/text/text.module';
import { createDynamicFieldProvider } from './utils';
import { DynamicFieldsMap } from './dynamic-fields.map';
import { PhotoService } from '../../../modules/dynamic-fields/photo/photo.service';
import { PhotoModule } from '../../../modules/dynamic-fields/photo/photo.module';
import { PriceService } from '../../../modules/dynamic-fields/price/price.service';
import { PriceModule } from '../../../modules/dynamic-fields/price/price.module';

const providers = [
    createDynamicFieldProvider(FieldType.INPUT_TEXT, InputTextService),
    createDynamicFieldProvider(FieldType.RADIO, RadioService),
    createDynamicFieldProvider(FieldType.TEXT, TextService),
    createDynamicFieldProvider(FieldType.TEXTAREA, TextareaService),
    createDynamicFieldProvider(FieldType.PHOTO, PhotoService),
    createDynamicFieldProvider(FieldType.PRICE, PriceService),
];

@NgModule({
    declarations: [],
    providers: [
        {
            provide: 'FIELDS_MAP',
            useValue: DynamicFieldsMap,
        },
        ...providers,
    ],
    imports: [CommonModule, InputTextModule, TextareaModule, RadioModule, TextModule, PhotoModule, PriceModule],
})
export class DynamicFieldsModule {}
