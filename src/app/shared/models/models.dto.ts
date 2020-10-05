/* Do not change, this code is generated from Golang structs */

export class Field {
    id: string;
    section_id: string;
    title: string;
    type: string;
    params: unknown;
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
export class ParamsInputText {
    id: string;
    field_id: string;
    label: string;
    placeholder: string;
    required: boolean;
}
export class ParamsTextarea {
    id: string;
    field_id: string;
    label: string;
    placeholder: string;
    required: boolean;
}
export class ParamsRadio {
    id: string;
    field_id: string;
    data: Radios;
}
export class RadioData {
    label: string;
    value: string;
}
export class Radios {
    radios: RadioData[];
}
export class ParamsText {
    id: string;
    field_id: string;
    value: string;
}
