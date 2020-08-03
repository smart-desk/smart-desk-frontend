import { Type } from '@angular/core';

import { FormInputBaseDirective } from '../components/input-base';
import { InputBaseDirective } from '../../modules/admin/core/components/input-base';
import { InputTextComponent } from '../components/input-text/input-text.component';
import { InputTextComponent as CreatorInputTextComponent } from '../../modules/admin/core/components/input-text/input-text.component';
import { RadioComponent } from '../components/radio/radio.component';
import { RadioComponent as CreatorRadioComponent } from '../../modules/admin/core/components/radio/radio.component';

export enum FieldTypes {
    INPUT_TEXT = 'input_text',
    RADIO = 'radio',
}

export interface FieldMetadata {
    type: FieldTypes;
    title: string;
    description?: string;
    component: Type<FormInputBaseDirective<unknown>>;
    creatorComponent: Type<InputBaseDirective<unknown>>;
}

export const fieldMetadataList = new Set<FieldMetadata>();

fieldMetadataList.add({
    type: FieldTypes.INPUT_TEXT,
    title: 'Текстовое поле',
    component: InputTextComponent,
    creatorComponent: CreatorInputTextComponent,
});

fieldMetadataList.add({
    type: FieldTypes.RADIO,
    title: 'Радиокнопка',
    component: RadioComponent,
    creatorComponent: CreatorRadioComponent,
});
