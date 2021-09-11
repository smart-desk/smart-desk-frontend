import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FieldEntity, FieldType, SectionType } from '../../../../modules/field/models/field.entity';
import { Model } from '../../../../modules/model/models/model.entity';
import { DynamicFieldsService } from '../../../dynamic-fields/dynamic-fields.service';

@Component({
    selector: 'app-add-field',
    templateUrl: './add-field.component.html',
    styleUrls: ['./add-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFieldComponent {
    @Input()
    model: Model;

    @Output()
    create = new EventEmitter<FieldEntity>();

    selectedSection = SectionType.PARAMS;
    selectedField = FieldType.INPUT_TEXT;

    sectionData = Object.values(SectionType);
    fieldData = {
        [SectionType.PARAMS]: [
            FieldType.PHOTO,
            FieldType.INPUT_TEXT,
            FieldType.RADIO,
            FieldType.CHECKBOX,
            FieldType.TEXTAREA,
            FieldType.TEXT,
            FieldType.DATEPICKER,
        ],
        [SectionType.LOCATION]: [FieldType.LOCATION],
        [SectionType.PRICE]: [FieldType.PRICE],
        [SectionType.CONTACTS]: [],
    };

    constructor(private dynamicFieldsService: DynamicFieldsService) {}

    sectionChange(value: SectionType): void {
        this.selectedField = (this.fieldData[value] && this.fieldData[value].length && this.fieldData[value][0]) as FieldType;
    }

    getSectionName(sectionType: SectionType): string {
        switch (sectionType) {
            case SectionType.CONTACTS:
                return 'Контакты';
            case SectionType.LOCATION:
                return 'Местоположение';
            case SectionType.PARAMS:
                return 'Параметры';
            case SectionType.PRICE:
                return 'Цена';
        }
    }

    getFieldName(fieldType: FieldType): string {
        const resolver = this.dynamicFieldsService.getService(fieldType);
        if (resolver) {
            return resolver.getFieldName();
        }
        return '';
    }

    createField(): void {
        const newField = new FieldEntity();
        newField.type = this.selectedField;
        newField.section = this.selectedSection;
        newField.modelId = this.model.id;
        newField.params = {};

        this.create.emit(newField);
    }
}
