import {
    ChangeDetectorRef,
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Field, Model, Section } from '../../../../core/models/models.dto';

import { FieldService, ModelService } from '../../../../core/services';
import { InputBaseDirective } from '../../core/components/input-base';
import { InputTextComponent } from '../../core/components/input-text/input-text.component';

@Component({
    selector: 'app-edit-model',
    templateUrl: './edit-model.component.html',
    styleUrls: ['./edit-model.component.scss'],
})
export class EditModelComponent implements OnInit {
    model: Model;

    private components: ComponentRef<InputBaseDirective<unknown>>[] = [];
    private deleteSubs = new Map<ComponentRef<InputBaseDirective<unknown>>, Subscription>();

    availableInputs = [
        {
            value: 'input_text',
            label: 'Текстовое поле',
        },
        {
            value: 'text',
            label: 'Поле для длинного текста',
        },
    ];

    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private modelsService: ModelService,
        private fieldService: FieldService,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap(params => {
                    return this.modelsService.getModel(params.get('id'));
                })
            )
            .subscribe(model => {
                this.model = model;
                this.cd.detectChanges();

                this.populateFormWithInputs(model.sections);
            });
    }

    createField(type: string, section: Section): void {
        this.fieldService
            .createField({
                type,
                section_id: section.id,
            })
            .subscribe(field => {
                const component = this.resolveFieldComponent(field);
                const deleteSub = component.instance.onDelete.subscribe(instance => this.onDelete(instance));

                this.deleteSubs.set(component, deleteSub);
                this.components.push(component);
            });
    }

    onBack(): void {
        this.router.navigate(['./admin/models']);
    }

    private populateFormWithInputs(sections: Section[]): void {
        // todo check if section is created and create in case not
        sections.forEach(section => {
            if (section.fields) {
                section.fields.forEach(field => {
                    const component = this.resolveFieldComponent(field);
                    component.instance.data = field.data;
                });
            }
        });
    }

    private resolveFieldComponent(field: Field): ComponentRef<InputBaseDirective<any>> {
        let resolver: ComponentFactory<InputBaseDirective<any>>;

        if (field.type === 'input_text') {
            resolver = this.componentFactoryResolver.resolveComponentFactory(InputTextComponent);
        }

        if (field.type === 'text') {
            resolver = this.componentFactoryResolver.resolveComponentFactory(InputTextComponent);
        }

        const component = this.fieldsFormContainerRef.createComponent(resolver);
        component.instance.field = field;

        return component;
    }

    private onDelete(instance: InputBaseDirective<unknown>): void {
        const targetComponent = this.components.find(component => component.instance === instance);

        this.deleteSubs.get(targetComponent).unsubscribe();
        this.deleteSubs.delete(targetComponent);

        this.fieldsFormContainerRef.remove(this.fieldsFormContainerRef.indexOf(targetComponent.hostView));
        this.cd.detectChanges();
    }
}
