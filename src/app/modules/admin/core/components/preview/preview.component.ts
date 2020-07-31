import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ModelService } from '../../../../../core/services';
import { Field, Section } from '../../../../../core/models/models.dto';
import { InputBaseDirective } from '../../../../../core/components/input-base';
import { getFieldComponentResolver } from '../../../../../core/services/field-resolvers/field-resolvers';
import { FieldTypes } from '../../../../../core/models/field-metadata';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {
    @Input()
    modelId: string;

    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    constructor(private modelService: ModelService, private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit(): void {
        this.update();
    }

    update(): void {
        if (this.fieldsFormContainerRef) {
            this.fieldsFormContainerRef.clear();
        }
        this.modelService.getModel(this.modelId).subscribe(model => {
            this.populateFormWithInputs(model.sections);
        });
    }

    private populateFormWithInputs(sections: Section[]): void {
        sections.forEach(section => {
            if (section.fields) {
                section.fields.forEach(field => {
                    this.resolveFieldComponent(field);
                });
            }
        });
    }

    private resolveFieldComponent(field: Field): ComponentRef<InputBaseDirective<unknown>> {
        const resolver = getFieldComponentResolver(this.componentFactoryResolver, field.type as FieldTypes);
        const component = this.fieldsFormContainerRef.createComponent(resolver);

        // add inputs
        component.instance.field = field;
        component.instance.preview = true;

        // run onInit
        component.changeDetectorRef.detectChanges();

        return component;
    }
}
