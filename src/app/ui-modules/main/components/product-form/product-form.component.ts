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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    constructor(protected dynamicFieldService: DynamicFieldsService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.formDefaultFields = this.fb.group({
            title: [this.product?.title, [Validators.required, Validators.maxLength(255)]],
            preferredContact: [this.product?.preferContact],
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
            const product = new UpdateProductDto();
            product.fields = this.components.map(component => component.instance.getFieldData()).filter(value => !!value);
            product.title = this.formDefaultFields.get('title')?.value;
            product.preferContact = this.formDefaultFields.get('preferredContact')?.value;
            this.submitForm.next(product);
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
        // todo mark form as touched to show errors
        if (!this.formDefaultFields.valid) {
            return false;
        }
        return this.components.every(component => component.instance.isFieldDataValid());
    }
}
