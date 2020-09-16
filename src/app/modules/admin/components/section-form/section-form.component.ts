import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Field, Section } from '../../../../shared/models/models.dto';
import { FieldSettingsComponent, OperationState } from '../field-settings';
import { getCreatorFieldComponentResolver } from '../../../../shared/services/field-resolvers/field-resolvers';
import { FieldMetadata, fieldMetadataList, FieldTypes } from '../../../../shared/models/field-metadata';
import { FieldService } from '../../../../shared/services';

@Component({
    selector: 'app-section-form',
    templateUrl: './section-form.component.html',
    styleUrls: ['./section-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionFormComponent implements AfterViewInit {
    @Input()
    section: Section;

    @Output()
    changeFields = new EventEmitter();

    private availableInputTypes = fieldMetadataList;

    private components: ComponentRef<FieldSettingsComponent<unknown>>[] = [];

    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private cd: ChangeDetectorRef,
        private fieldService: FieldService
    ) {}

    ngAfterViewInit() {
        this.section.fields.forEach(field => {
            const component = this.resolveFieldComponent(field);
            this.components.push(component);
        });
    }

    createField(type: FieldTypes, section: Section): void {
        // @TODO: We need to create field after we clicks OK, not before.
        this.fieldService
            .createField({
                type,
                section_id: section.id,
            })
            .subscribe(field => {
                const component = this.resolveFieldComponent(field);
                this.components.push(component);
            });
    }

    get title(): string {
        // todo enum
        switch (this.section.type) {
            case 'params':
                return 'Параметры объявления';
            case 'price':
                return 'Цена';
            case 'location':
                return 'Местоположение';
            case 'contacts':
                return 'Контакты';
        }
    }

    get availableFields(): FieldMetadata[] {
        // todo filter based on type
        return [...this.availableInputTypes];
    }

    private resolveFieldComponent(field: Field): ComponentRef<FieldSettingsComponent<unknown>> {
        const resolver = getCreatorFieldComponentResolver(this.componentFactoryResolver, field.type as FieldTypes);
        const component = this.fieldsFormContainerRef.createComponent(resolver);

        // add inputs
        component.instance.field = field;

        // subscribe on events
        component.instance.onSave$.subscribe(state => this.onSave(state));
        component.instance.onDelete.subscribe(instance => this.onDelete(instance));

        // run onInit
        component.changeDetectorRef.detectChanges();

        return component;
    }

    private onDelete(instance: FieldSettingsComponent<unknown>): void {
        const targetComponent = this.components.find(component => component.instance === instance);

        this.fieldsFormContainerRef.remove(this.fieldsFormContainerRef.indexOf(targetComponent.hostView));

        this.cd.detectChanges();
    }

    private onSave(state: OperationState): void {
        if (state === OperationState.SUCCESS) {
            this.changeFields.emit();
        }
    }
}
