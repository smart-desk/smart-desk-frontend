import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from './modules/input-text/input-text.module';
import { InputTextService } from './modules/input-text/input-text.service';
import { RadioService } from './modules/radio/radio.service';
import { TextService } from './modules/text/text.service';
import { TextareaService } from './modules/textarea/textarea.service';
import { TextareaModule } from './modules/textarea/textarea.module';
import { RadioModule } from './modules/radio/radio.module';
import { TextModule } from './modules/text/text.module';
import { createDynamicFieldProvider } from './utils';
import { DynamicFieldsMap } from './dynamic-fields.map';
import { PhotoService } from './modules/photo/photo.service';
import { PhotoModule } from './modules/photo/photo.module';
import { PriceService } from './modules/price/price.service';
import { PriceModule } from './modules/price/price.module';
import { LocationService } from './modules/location/location.service';
import { LocationModule } from './modules/location/location.module';
import { CheckboxService } from './modules/checkbox/checkbox.service';
import { CheckboxModule } from './modules/checkbox/checkbox.module';
import { FieldType } from '../../models/field/field.entity';

const providers = [
    createDynamicFieldProvider(FieldType.INPUT_TEXT, InputTextService),
    createDynamicFieldProvider(FieldType.RADIO, RadioService),
    createDynamicFieldProvider(FieldType.TEXT, TextService),
    createDynamicFieldProvider(FieldType.TEXTAREA, TextareaService),
    createDynamicFieldProvider(FieldType.PHOTO, PhotoService),
    createDynamicFieldProvider(FieldType.PRICE, PriceService),
    createDynamicFieldProvider(FieldType.LOCATION, LocationService),
    createDynamicFieldProvider(FieldType.CHECKBOX, CheckboxService),
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
    imports: [
        CommonModule,
        InputTextModule,
        TextareaModule,
        RadioModule,
        TextModule,
        PhotoModule,
        PriceModule,
        LocationModule,
        CheckboxModule,
    ],
})
export class DynamicFieldsModule {}
