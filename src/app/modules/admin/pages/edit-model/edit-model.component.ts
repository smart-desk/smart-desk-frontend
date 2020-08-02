import { ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Field, Model, Section } from '../../../../core/models/models.dto';

import { FieldService, ModelService } from '../../../../core/services';
import { InputBaseDirective, OperationState } from '../../core/components/input-base';
import { PreviewComponent } from '../../core/components/preview/preview.component';
import { fieldMetadataList, FieldTypes } from '../../../../core/models/field-metadata';
import { getCreatorFieldComponentResolver } from '../../../../core/services/field-resolvers/field-resolvers';

@Component({
    selector: 'app-edit-model',
    templateUrl: './edit-model.component.html',
    styleUrls: ['./edit-model.component.scss'],
})
export class EditModelComponent implements OnInit {
    model: Model;

    private components: ComponentRef<InputBaseDirective<unknown>>[] = [];

    availableInputTypes = fieldMetadataList;

    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    @ViewChild(PreviewComponent)
    private preview: PreviewComponent;

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

    createField(type: FieldTypes, section: Section): void {
        // @TODO: We need to create field afer we clicks OK, not before.
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

    onBack(): void {
        this.router.navigate(['./admin/models']);
    }

    private populateFormWithInputs(sections: Section[]): void {
        // todo check if section is created and create in case not
        sections.forEach(section => {
            if (section.fields) {
                section.fields.forEach(field => {
                    const component = this.resolveFieldComponent(field);
                    this.components.push(component);
                });
            }
        });
    }

    private resolveFieldComponent(field: Field): ComponentRef<InputBaseDirective<unknown>> {
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

    private onDelete(instance: InputBaseDirective<unknown>): void {
        const targetComponent = this.components.find(component => component.instance === instance);

        this.fieldsFormContainerRef.remove(this.fieldsFormContainerRef.indexOf(targetComponent.hostView));

        this.updatePreview();

        this.cd.detectChanges();
    }

    private onSave(state: OperationState): void {
        // todo update only changed field
        if (state === OperationState.SUCCESS) {
            this.updatePreview();
        }
    }

    private updatePreview(): void {
        this.preview.update();
    }
}
