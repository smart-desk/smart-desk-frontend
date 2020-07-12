import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ModelService } from '../../../../core/services/model/model.service';
import { Field, Model, Section } from '../../../../core/models/models.dto';
import { SectionService } from '../../../../core/services/section/section.service';
import { InputTextComponent } from '../../core/components/input-text/input-text.component';
import { FieldService } from '../../../../core/services/field/field.service';
import { InputBase } from '../../core/components/input-base/input-base';

@Component({
    selector: 'app-create-model',
    templateUrl: './create-model.component.html',
    styleUrls: ['./create-model.component.scss'],
})
export class CreateModelComponent {
    public model: Model;
    public section: Section;
    private components: ComponentRef<any>[] = [];

    public availableInputs = [
        {
            value: 'input_text',
            label: 'Текстовое поле',
        },
        {
            value: 'text',
            label: 'Поле для длинного текста',
        },
    ];

    // todo вывести ошибки
    public modelForm = new FormGroup({
        name: new FormControl((this.model && this.model.name) || '', Validators.required),
    });

    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private modelsService: ModelService,
        private sectionService: SectionService,
        private fieldService: FieldService,
        private router: Router
    ) {}

    public createModel(): void {
        this.modelsService
            .createModel({
                name: this.modelForm.get('name').value,
            })
            .pipe(
                switchMap(model => {
                    this.model = model;
                    return this.sectionService.createSection({
                        model_id: this.model.id,
                    });
                })
            )
            .subscribe(section => {
                this.section = section;
            });
    }

    public createField(type: string): void {
        this.fieldService
            .createField({
                type,
                section_id: this.section.id,
            })
            .subscribe(field => {
                this.addFieldComponent(field);
            });
    }

    public addFieldComponent(field: Field): void {
        let resolver: ComponentFactory<InputBase>;

        if (field.type === 'input_text') {
            resolver = this.componentFactoryResolver.resolveComponentFactory(InputTextComponent);
        }

        if (field.type === 'text') {
            resolver = this.componentFactoryResolver.resolveComponentFactory(InputTextComponent);
        }

        const component = this.fieldsFormContainerRef.createComponent(resolver);
        component.instance.field = field;
        this.components.push(component);
    }

    public onBack(): void {
        this.router.navigate(['./admin/models']);
    }

    public save(): void {
        // todo create abstract class
        this.components.forEach((component: any) => {
            const value = component.instance.getValue && component.instance.getValue();
            console.log(value);
        });
    }
}
