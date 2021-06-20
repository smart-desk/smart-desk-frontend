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
import { FieldEntity } from '../../../../services/field/models/field.entity';
import { CreateAdvertDto, UpdateAdvertDto } from '../../../../services/advert/models/advert.dto';
import { Advert } from '../../../../services/advert/models/advert.entity';

@Component({
    selector: 'app-advert-form',
    templateUrl: './advert-form.component.html',
    styleUrls: ['./advert-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertFormComponent implements OnInit, AfterViewInit {
    @Output() submitForm = new EventEmitter<UpdateAdvertDto | CreateAdvertDto>();
    @Input() advert: Advert;
    preferContact = PreferContact;
    formDefaultFields: FormGroup;
    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;
    private components: ComponentRef<AbstractFieldFormComponent<any, any>>[] = [];

    constructor(protected dynamicFieldService: DynamicFieldsService) {}

    ngOnInit(): void {
        this.formDefaultFields = new FormGroup({
            title: new FormControl(this.advert.title || undefined, [Validators.required]),
            preferredContact: new FormControl(this.advert.preferContact || undefined),
        });
    }

    ngAfterViewInit(): void {
        if (this.advert.id) {
            this.formDefaultFields.get('title')?.setValue(this.advert.title);
            this.formDefaultFields.get('preferredContact')?.setValue(this.advert.preferContact);
        }
        this.populateFormWithInputs(this.advert.fields);
    }

    save(): void {
        if (this.isValid()) {
            const advert = new UpdateAdvertDto();
            advert.fields = this.components.map(component => component.instance.getFieldData()).filter(value => !!value);
            advert.title = this.formDefaultFields.get('title')?.value;
            advert.preferContact = this.formDefaultFields.get('preferredContact')?.value;
            this.submitForm.next(advert);
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
