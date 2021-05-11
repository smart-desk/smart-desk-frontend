export enum FieldType {
    INPUT_TEXT = 'input_text',
    TEXTAREA = 'textarea',
    TEXT = 'text',
    RADIO = 'radio',
    PHOTO = 'photo',
    PRICE = 'price',
    LOCATION = 'location',
    CHECKBOX = 'checkbox',
}

export class FieldEntity {
    id: string;
    title: string;
    required: boolean;
    type: FieldType;
    // tslint:disable-next-line:variable-name
    section_id: string;
    filterable: boolean;
    params: unknown;
    data: unknown;
    order: number;
}
