import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { PreferContact } from '../../enums/contact-values.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractFieldFormComponent } from '../../../dynamic-fields/models/abstract-field-form.component';
import { DynamicFieldsService } from '../../../dynamic-fields/dynamic-fields.service';
import { FieldEntity } from '../../../../modules/field/models/field.entity';
import { CreateProductDto, UpdateProductDto } from '../../../../modules/product/models/product.dto';
import { Product } from '../../../../modules/product/models/product.entity';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit, AfterViewInit {
    @Output() submitForm = new EventEmitter<UpdateProductDto | CreateProductDto>();
    @Input() product: Product;
    preferContact = PreferContact;
    formDefaultFields: FormGroup;
    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;
    private components: ComponentRef<AbstractFieldFormComponent<any, any>>[] = [];

    constructor(protected dynamicFieldService: DynamicFieldsService) {}

    ngOnInit(): void {
        this.formDefaultFields = new FormGroup({
            title: new FormControl(this.product.title || undefined, [Validators.required]),
            preferredContact: new FormControl(this.product.preferContact || undefined),
        });
    }

    ngAfterViewInit(): void {
        if (this.product.id) {
            this.formDefaultFields.get('title')?.setValue(this.product.title);
            this.formDefaultFields.get('preferredContact')?.setValue(this.product.preferContact);
        }
        this.populateFormWithInputs(this.product.fields);
    }

    save(): void {
        if (this.isValid()) {
            const poduct = new UpdateProductDto();
            poduct.fields = this.components.map(component => component.instance.getFieldData()).filter(value => !!value);
            poduct.title = this.formDefaultFields.get('title')?.value;
            poduct.preferContact = this.formDefaultFields.get('preferredContact')?.value;
            this.submitForm.next(poduct);
        }
    }

    protected populateFormWithInputs(fields: FieldEntity[]): void {
        fields.forEach(field => {
            const component = this.resolveFieldComponent(field);
            if (component) {
                this.components.push(component);
            }
        });
    }

    protected resolveFieldComponent(field: FieldEntity): ComponentRef<AbstractFieldFormComponent<any, any>> | null {
        const service = this.dynamicFieldService.getService(field.type);
        if (!service) {
            return null;
        }
        const resolver = service.getFormComponentResolver();
        if (resolver) {
            const component = this.fieldsFormContainerRef.createComponent(resolver);

            // add inputs
            component.instance.field = field;

            // run onInit
            component.changeDetectorRef.detectChanges();

            return component;
        }
        return null;
    }

    protected isValid(): boolean {
        if (!this.formDefaultFields.valid) {
            return false;
        }
        return this.components.every(component => component.instance.isFieldDataValid());
    }
}
