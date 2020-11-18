import { InputTextDto } from './field-params/input-text.dto';
import { TextareaDto } from './field-params/textarea.dto';
import { TextDto } from './field-params/text.dto';
import { RadioDto } from './field-params/radio.dto';

export enum FieldType {
    INPUT_TEXT = 'input_text',
    TEXTAREA = 'textarea',
    TEXT = 'text',
    RADIO = 'radio',
}

export class Field {
    id: string;
    title: string;
    type: FieldType;
    // tslint:disable-next-line:variable-name
    section_id: string;
    params: InputTextDto | TextareaDto | TextDto | RadioDto;
    data: unknown;
}
