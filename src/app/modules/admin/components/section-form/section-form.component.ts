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
import { FieldEntity, FieldType } from '../../../../shared/models/dto/field.entity';
import { AbstractFieldParamsComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-params.component';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';
import { OperationState } from '../../../../shared/models/operation-state.enum';

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

    private components: ComponentRef<AbstractFieldParamsComponent>[] = [];

    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private cd: ChangeDetectorRef,
        private dynamicFieldsService: DynamicFieldsService
    ) {}

    ngAfterViewInit() {
        this.section.fields.forEach(field => {
            const component = this.resolveFieldComponent(field);
            this.components.push(component);
        });
    }

    createField(type: string, section: Section): void {
        const field = new FieldEntity();
        field.type = type as FieldType; // todo as
        field.section_id = section.id;

        const component = this.resolveFieldComponent(field);
        this.components.push(component);
    }

    availableFieldTypes(): string[] {
        return Object.values(FieldType);
    }

    getFieldName(type: string): string {
        const service = this.dynamicFieldsService.getService(type as FieldType);
        return service ? service.getFieldName() : '';
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

    private resolveFieldComponent(field: FieldEntity): ComponentRef<AbstractFieldParamsComponent> {
        const service = this.dynamicFieldsService.getService(field.type);
        if (!service) {
            return;
        }

        const resolver = service.getParamsComponentResolver();
        const component = this.fieldsFormContainerRef.createComponent(resolver);

        component.instance.field = field;
        component.instance.onSave$.subscribe(state => this.onSave(state));
        component.instance.onDelete.subscribe(instance => this.onDelete(instance));
        component.changeDetectorRef.detectChanges();

        return component;
    }

    private onDelete(instance: AbstractFieldParamsComponent): void {
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
