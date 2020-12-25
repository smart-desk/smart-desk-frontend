export class RadioParamsDto {
    radios: RadioItem[];
    filterable: boolean;
}

export class RadioItem {
    label: string;
    value: string;
}
