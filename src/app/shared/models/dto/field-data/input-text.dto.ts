import { CreateFieldDataBaseDto, UpdateFieldDataBaseDto } from './field-data-base.dto';

export class CreateInputTextDto extends CreateFieldDataBaseDto {
    value: string;
}

export class UpdateInputTextDto extends UpdateFieldDataBaseDto {
    value: string;
}
