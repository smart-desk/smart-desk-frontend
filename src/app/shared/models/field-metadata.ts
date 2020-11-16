import { Type } from '@angular/core';

import { FieldFormComponent } from '../components/field-form/field-form.component';
import { FieldSettingsComponent as CreatorInputBaseDirective } from '../../modules/admin/components/field-settings';
import { InputTextFormComponent } from '../components/input-text-form/input-text-form.component';
import { InputTextSettingsComponent as CreatorInputTextComponent } from '../../modules/admin/components/input-text-settings/input-text-settings.component';
import { RadioFormComponent } from '../components/radio-form/radio-form.component';
import { RadioSettingsComponent as CreatorRadioComponent } from '../../modules/admin/components/radio-settings/radio-settings.component';
import { TextareaSettingsComponent as CreatorTextareaComponent } from '../../modules/admin/components/textarea-settings/textarea-settings.component';
import { TextareaFormComponent } from '../components/textarea-form/textarea-form.component';
import { TextComponent } from '../components/text/text.component';
import { TextSettingsComponent } from '../../modules/admin/components/text-settings/text-settings.component';
import { FieldType } from './dto/field.entity';

export interface FieldMetadata {
    type: FieldType;
    title: string;
    description?: string;
    formComponent: Type<FieldFormComponent<unknown>>;
    settingsComponent: Type<CreatorInputBaseDirective<unknown>>;
}

export const fieldMetadataList = new Set<FieldMetadata>();

fieldMetadataList.add({
    type: FieldType.INPUT_TEXT,
    title: 'Текстовое поле',
    formComponent: InputTextFormComponent,
    settingsComponent: CreatorInputTextComponent,
});

fieldMetadataList.add({
    type: FieldType.RADIO,
    title: 'Радиокнопка',
    formComponent: RadioFormComponent,
    settingsComponent: CreatorRadioComponent,
});

fieldMetadataList.add({
    type: FieldType.TEXTAREA,
    title: 'Большое текстовое поле',
    formComponent: TextareaFormComponent,
    settingsComponent: CreatorTextareaComponent,
});

fieldMetadataList.add({
    type: FieldType.TEXT,
    title: 'Текст',
    formComponent: TextComponent,
    settingsComponent: TextSettingsComponent,
});
