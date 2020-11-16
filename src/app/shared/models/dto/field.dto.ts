import { FieldType } from './field.entity';
import { InputTextDto } from './field-params/input-text.dto';
import { TextareaDto } from './field-params/textarea.dto';
import { TextDto } from './field-params/text.dto';
import { RadioDto } from './field-params/radio.dto';

export type FieldParamsType = InputTextDto | TextareaDto | TextDto | RadioDto;

export class FieldCreateDto {
    title?: string;
    type: FieldType;
    section_id: string;
    params?: FieldParamsType;
}

export class FieldUpdateDto {
    title?: string;
    type: FieldType;
    params?: FieldParamsType;
}
