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
import { ModelService } from '../../../../shared/services';
import { FieldFormComponent } from '../../../../shared/components/field-form/field-form.component';
import { getFieldComponentResolver } from '../../../../shared/services/field-resolvers/field-resolvers';
import { Section } from '../../../../shared/models/dto/section.entity';
import { Field } from '../../../../shared/models/dto/field.entity';

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

    private resolveFieldComponent(field: Field): ComponentRef<FieldFormComponent<unknown>> {
        const resolver = getFieldComponentResolver(this.componentFactoryResolver, field.type);
        const component = this.fieldsFormContainerRef.createComponent(resolver);

        // add inputs
        component.instance.field = field;
        component.instance.preview = true;

        // run onInit
        component.changeDetectorRef.detectChanges();

        return component;
    }
}
