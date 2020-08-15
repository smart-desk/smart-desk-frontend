import { Type } from '@angular/core';

import { FieldFormComponent } from '../components/field-form/field-form.component';
import { FieldSettingsComponent as CreatorInputBaseDirective } from '../../modules/admin/components/field-settings';
import { InputTextFormComponent } from '../components/input-text-form/input-text-form.component';
import { InputTextSettingsComponent as CreatorInputTextComponent } from '../../modules/admin/components/input-text-settings/input-text-settings.component';
import { RadioFormComponent } from '../components/radio-form/radio-form.component';
import { RadioSettingsComponent as CreatorRadioComponent } from '../../modules/admin/components/radio-settings/radio-settings.component';
import { TextareaSettingsComponent as CreatorTextareaComponent } from '../../modules/admin/components/textarea-settings/textarea-settings.component';
import { TextareaFormComponent } from '../components/textarea-form/textarea-form.component';
import { TextEditorComponent } from '../components/text-editor-form/text-editor.component';
import { TextSettingsComponent } from '../../modules/admin/components/text-settings/text-settings.component';

export enum FieldTypes {
    INPUT_TEXT = 'input_text',
    RADIO = 'radio',
    TEXTAREA = 'textarea',
    TEXT = 'text',
}

export interface FieldMetadata {
    type: FieldTypes;
    title: string;
    description?: string;
    formComponent: Type<FieldFormComponent<unknown>>;
    settingsComponent: Type<CreatorInputBaseDirective<unknown>>;
}

export const fieldMetadataList = new Set<FieldMetadata>();

fieldMetadataList.add({
    type: FieldTypes.INPUT_TEXT,
    title: 'Текстовое поле',
    formComponent: InputTextFormComponent,
    settingsComponent: CreatorInputTextComponent,
});

fieldMetadataList.add({
    type: FieldTypes.RADIO,
    title: 'Радиокнопка',
    formComponent: RadioFormComponent,
    settingsComponent: CreatorRadioComponent,
});

fieldMetadataList.add({
    type: FieldTypes.TEXTAREA,
    title: 'Большое текстовое поле',
    formComponent: TextareaFormComponent,
    settingsComponent: CreatorTextareaComponent,
});

fieldMetadataList.add({
    type: FieldTypes.TEXT,
    title: 'Текст',
    formComponent: TextEditorComponent,
    settingsComponent: TextSettingsComponent,
});
