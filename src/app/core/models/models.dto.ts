/* Do not change, this code is generated from Golang structs */

export class Field {
    id: string;
    section_id: string;
    type: string;
    data: unknown;
}
export class Section {
    id: string;
    model_id: string;
    fields: Field[];
}
export class Model {
    id: string;
    name: string;
    sections: Section[];
}

export class UserFieldInputText {
    id: string;
    field_id: string;
    value: string;
}
export class UserFieldText {
    id: string;
    section_id: string;
    value: string;
}
export class CreatorFieldInputText {
    id: string;
    field_id: string;
    label: string;
    placeholder: string;
    required: boolean;
}
export class CreatorFieldText {
    id: string;
    field_id: string;
    label: string;
    placeholder: string;
    required: boolean;
}
