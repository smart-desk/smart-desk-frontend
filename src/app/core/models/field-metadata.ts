import { Type } from '@angular/core';

import { InputBaseDirective } from '../components/input-base';
import { InputBaseDirective as CreatorInputBaseDirective } from '../../modules/admin/core/components/input-base';
import { InputTextComponent } from '../components/input-text/input-text.component';
import { InputTextComponent as CreatorInputTextComponent } from '../../modules/admin/core/components/input-text/input-text.component';
import { TextareaComponent as CreatorTextareaComponent } from '../../modules/admin/core/components/textarea/textarea.component';
import { TextareaComponent } from '../components/textarea/textarea.component';

export enum FieldTypes {
    INPUT_TEXT = 'input_text',
    // todo rename text -> textarea on backend
    TEXTAREA = 'text',
}

export interface FieldMetadata {
    type: FieldTypes;
    title: string;
    description?: string;
    component: Type<InputBaseDirective<unknown>>;
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
    type: FieldTypes.TEXTAREA,
    title: 'Большое текстовое поле',
    component: TextareaComponent,
    creatorComponent: CreatorTextareaComponent,
});
