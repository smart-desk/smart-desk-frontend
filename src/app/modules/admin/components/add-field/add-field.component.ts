import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FieldEntity, FieldType } from '../../../../models/field/field.entity';
import { SectionType } from '../../../../models/section/section.entity';
import { Model } from '../../../../models/model/model.entity';
import { FieldService } from '../../../../services';
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
        // todo some const should be used
        switch (sectionType) {
            case SectionType.CONTACTS:
                return 'Contacts';
            case SectionType.LOCATION:
                return 'Location';
            case SectionType.PARAMS:
                return 'Params';
            case SectionType.PRICE:
                return 'Price';
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
        const section = this.model.sections.find(s => s.type === this.selectedSection);
        if (!section) {
            // todo create a section
            return;
        }
        const newField = new FieldEntity();
        newField.type = this.selectedField;
        newField.section_id = section.id;
        newField.params = {};

        this.create.emit(newField);
    }
}
