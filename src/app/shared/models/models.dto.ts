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
    type: string;
}
export class Model {
    id: string;
    name: string;
    sections: Section[];
}

export class Category {
    id: string;
    model_id: string;
    parent_id: string;
    name: string;
}
export class Advert {
    id: string;
    title: string;
    category_id: string;
    model_id: string;
    created_at: string;
    updated_at: string;
}
export class AdvertFieldBase {
    id: string;
    advert_id: string;
    value: unknown;
    field_id: string;
}
export class AdvertSection {
    id: string;
    type: string;
    fields: AdvertFieldBase[];
}
export class AdvertResponse {
    id: string;
    title: string;
    category_id: string;
    model_id: string;
    created_at: string;
    updated_at: string;
    sections: AdvertSection[];
}
export class AdvertListResponse {
    data: AdvertResponse[];
    page: number;
    limit: number;
    total_count: number;
}

export class AdvertRequest {
    id: string;
    title: string;
    category_id: string;
    model_id: string;
    created_at: string;
    updated_at: string;
    data: AdvertFieldBase[];
}
export class CreatorFieldInputText {
    id: string;
    field_id: string;
    label: string;
    placeholder: string;
    required: boolean;
}
export class CreatorFieldTextarea {
    id: string;
    field_id: string;
    label: string;
    placeholder: string;
    required: boolean;
}
export class CreatorFieldRadio {
    id: string;
    field_id: string;
    label: string;
    value: string;
}
export class CreatorFieldText {
    id: string;
    field_id: string;
    value: string;
}
