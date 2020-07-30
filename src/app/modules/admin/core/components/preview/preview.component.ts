import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ModelService } from '../../../../../core/services';
import { Field, Section } from '../../../../../core/models/models.dto';
import { InputTextComponent } from '../../../../../core/components/input-text/input-text.component';
import { InputBaseDirective } from '../../../../../core/components/input-base';

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
        let resolver: ComponentFactory<InputBaseDirective<any>>;

        if (field.type === 'input_text') {
            resolver = this.componentFactoryResolver.resolveComponentFactory(InputTextComponent);
        }

        if (field.type === 'text') {
            resolver = this.componentFactoryResolver.resolveComponentFactory(InputTextComponent);
        }

        // create component
        const component = this.fieldsFormContainerRef.createComponent(resolver);

        // add inputs
        component.instance.field = field;
        component.instance.data = field.data;
        component.instance.preview = true;

        // run onInit
        component.changeDetectorRef.detectChanges();

        return component;
    }
}
