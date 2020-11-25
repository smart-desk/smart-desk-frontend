export enum FieldType {
    INPUT_TEXT = 'input_text',
    TEXTAREA = 'textarea',
    TEXT = 'text',
    RADIO = 'radio',
    PHOTO = 'photo',
}

export class Field {
    id: string;
    title: string;
    type: FieldType;
    // tslint:disable-next-line:variable-name
    section_id: string;
    params: unknown;
    data: unknown;
}
