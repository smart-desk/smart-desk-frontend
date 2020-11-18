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
import { Section } from '../../../../shared/models/dto/section.entity';
import { Field, FieldType } from '../../../../shared/models/dto/field.entity';
import { AbstractFieldParamsComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-params.component';

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

    private components: ComponentRef<AbstractFieldParamsComponent<unknown>>[] = [];

    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.section.fields.forEach(field => {
            const component = this.resolveFieldComponent(field);
            this.components.push(component);
        });
    }

    createField(type: FieldType, section: Section): void {
        const field = new Field();
        field.type = type;
        field.section_id = section.id;

        const component = this.resolveFieldComponent(field);
        this.components.push(component);
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

    private resolveFieldComponent(field: Field): ComponentRef<AbstractFieldParamsComponent<unknown>> {
        const resolver = getCreatorFieldComponentResolver(this.componentFactoryResolver, field.type);
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

    private onDelete(instance: AbstractFieldParamsComponent<unknown>): void {
        const targetComponent = this.components.find(component => component.instance === instance);

        this.fieldsFormContainerRef.remove(this.fieldsFormContainerRef.indexOf(targetComponent.hostView));

        this.changeFields.emit();
        this.cd.detectChanges();
    }

    private onSave(state: OperationState): void {
        if (state === OperationState.SUCCESS) {
            this.changeFields.emit();
        }
    }
}
