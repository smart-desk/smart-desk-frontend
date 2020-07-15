import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    ViewChild,
    ViewContainerRef,
    OnInit,
    ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from '../../../../core/services/model/model.service';
import { Field, Model, ModelExtended, Section } from '../../../../core/models/models.dto';
import { InputTextComponent } from '../../core/components/input-text/input-text.component';
import { FieldService } from '../../../../core/services/field/field.service';
import { InputBase } from '../../core/components/input-base/input-base';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-edit-model',
    templateUrl: './edit-model.component.html',
    styleUrls: ['./edit-model.component.scss'],
})
export class EditModelComponent implements OnInit {
    public model: ModelExtended;
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

    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private modelsService: ModelService,
        private fieldService: FieldService,
        private router: Router,
        private route: ActivatedRoute,
        private ref: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap(params => {
                    return this.modelsService.getModel(params.get('id'));
                })
            )
            .subscribe(model => {
                this.model = model;
                this.ref.detectChanges();
                this.populateFormWithInputs();
            });
    }

    public createField(type: string, section: Section): void {
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

    public onBack(): void {
        this.router.navigate(['./admin/models']);
    }

    private populateFormWithInputs(): void {
        // todo check if section is created and create in case not
        this.model.sections.forEach(section => {
            section.fields.forEach(field => {
                const component = this.resolveFieldComponent(field);
                component.instance.data = field.data;
            });
        });
    }

    private resolveFieldComponent(field: Field): ComponentRef<InputBase> {
        let resolver: ComponentFactory<InputBase>;

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
}
