export enum FieldType {
    INPUT_TEXT = 'input_text',
    TEXTAREA = 'textarea',
    TEXT = 'text',
    RADIO = 'radio',
    PHOTO = 'photo',
    PRICE = 'price',
}

export class FieldEntity {
    id: string;
    title: string;
    type: FieldType;
    // tslint:disable-next-line:variable-name
    section_id: string;
    filterable: boolean;
    params: unknown;
    data: unknown;
}
