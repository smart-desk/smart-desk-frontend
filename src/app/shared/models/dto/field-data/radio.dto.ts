import { CreateFieldDataBaseDto, UpdateFieldDataBaseDto } from './field-data-base.dto';

export class CreateRadioDto extends CreateFieldDataBaseDto {
    value: string;
}

export class UpdateRadioDto extends UpdateFieldDataBaseDto {
    value: string;
}
