export enum FieldType {
    INPUT_TEXT = 'input_text',
    TEXTAREA = 'textarea',
    TEXT = 'text',
    RADIO = 'radio',
    PHOTO = 'photo',
    PRICE = 'price',
    LOCATION = 'location',
    CHECKBOX = 'checkbox',
    DATEPICKER = 'datepicker',
}

export enum SectionType {
    PARAMS = 'params',
    CONTACTS = 'contacts',
    LOCATION = 'location',
    PRICE = 'price',
}

export class FieldEntity {
    id: string;
    modelId: string;
    title: string;
    required: boolean;
    section: SectionType;
    type: FieldType;
    // tslint:disable-next-line:variable-name
    filterable: boolean;
    params: unknown;
    data: unknown;
    order: number;
}
