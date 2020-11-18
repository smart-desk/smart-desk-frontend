import { CreateFieldDataBaseDto, UpdateFieldDataBaseDto } from './field-data-base.dto';

export class CreateTextareaDto extends CreateFieldDataBaseDto {
    value: string;
}

export class UpdateTextareaDto extends UpdateFieldDataBaseDto {
    value: string;
}
