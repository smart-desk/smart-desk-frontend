import { FieldType } from '../../../models/field/field.entity';

export enum SortingMode {
    ASC = 'ASC',
    DESC = 'DESC',
}

export interface SortingField {
    label: string;
    mode: SortingMode;
    field: FieldType;
}
