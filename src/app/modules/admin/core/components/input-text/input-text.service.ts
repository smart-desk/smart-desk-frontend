import { Injectable } from '@angular/core';
import { FieldService } from '../../../../../core/services/field/field.service';

@Injectable()
export class InputTextService {
    constructor(private fieldService: FieldService) {}
}
