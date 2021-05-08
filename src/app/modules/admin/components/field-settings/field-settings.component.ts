import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { FieldEntity } from '../../../../models/field/field.entity';
import { OperationState } from '../../../../models/operation-state.enum';
import { DynamicFieldsService } from '../../../dynamic-fields/dynamic-fields.service';
import { FieldService } from '../../../../services';
import { AbstractFieldParamsComponent } from '../../../dynamic-fields/models/abstract-field-params.component';

@Component({
    selector: 'app-field-settings',
    templateUrl: './field-settings.component.html',
    styleUrls: ['./field-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldSettingsComponent implements AfterViewInit {
    @Input()
    field: FieldEntity;

    // todo operation state

    @Output()
    fieldChange = new EventEmitter();

    @ViewChild('paramsForm', { read: ViewContainerRef })
    private paramsFormContainer: ViewContainerRef;
    private component: ComponentRef<AbstractFieldParamsComponent<any>>;

    constructor(private dynamicFieldsService: DynamicFieldsService, private cdr: ChangeDetectorRef, private fieldService: FieldService) {}

    ngAfterViewInit() {
        const service = this.dynamicFieldsService.getService(this.field.type);
        if (!service) {
            return;
        }
        const resolver = service.getParamsComponentResolver();
        if (!resolver) {
            return;
        }

        this.component = this.paramsFormContainer.createComponent(resolver);
        this.component.instance.field = this.field;
        this.cdr.detectChanges();
    }

    onSave(): void {
        const field = this.component.instance.getField();
        const request = field.id ? this.fieldService.updateField(field.id, field) : this.fieldService.createField(field);

        request.subscribe(
            () => {
                this.fieldChange.emit(OperationState.SUCCESS);
            },
            () => {
                this.fieldChange.emit(OperationState.ERROR);
            }
        );
    }
}
