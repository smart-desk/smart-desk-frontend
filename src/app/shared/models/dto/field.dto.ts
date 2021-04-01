import { FieldType } from './field.entity';

export class FieldCreateDto {
    title?: string;
    type: FieldType;
    section_id: string;
    params?: unknown;
    order?: number;
}

export class FieldUpdateDto {
    title?: string;
    type: FieldType;
    params?: unknown;
    order?: number;
}
