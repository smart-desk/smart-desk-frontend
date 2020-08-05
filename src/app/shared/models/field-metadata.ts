import { Type } from '@angular/core';

import { FieldFormComponent } from '../components/field-form/field-form.component';
import { FieldSettingsComponent as CreatorInputBaseDirective } from '../../modules/admin/components/field-settings';
import { InputTextComponent } from '../components/input-text/input-text.component';
import { InputTextComponent as CreatorInputTextComponent } from '../../modules/admin/components/input-text/input-text.component';
import { RadioComponent } from '../components/radio/radio.component';
import { RadioComponent as CreatorRadioComponent } from '../../modules/admin/components/radio/radio.component';
import { TextareaComponent as CreatorTextareaComponent } from '../../modules/admin/components/textarea/textarea.component';
import { TextareaComponent } from '../components/textarea/textarea.component';

export enum FieldTypes {
    INPUT_TEXT = 'input_text',
    RADIO = 'radio',
    TEXTAREA = 'textarea',
}

export interface FieldMetadata {
    type: FieldTypes;
    title: string;
    description?: string;
    component: Type<FieldFormComponent<unknown>>;
    creatorComponent: Type<CreatorInputBaseDirective<unknown>>;
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

fieldMetadataList.add({
    type: FieldTypes.TEXTAREA,
    title: 'Большое текстовое поле',
    component: TextareaComponent,
    creatorComponent: CreatorTextareaComponent,
});
