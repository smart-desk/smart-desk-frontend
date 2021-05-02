import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { DynamicFieldsService } from '../../../shared/modules/dynamic-fields/dynamic-fields.service';
import { FieldEntity } from '../../../shared/models/field/field.entity';
import { OperationState } from '../../../shared/models/operation-state.enum';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
    selector: 'app-field-settings',
    templateUrl: './field-settings.component.html',
    styleUrls: ['./field-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldSettingsComponent implements AfterViewInit {
    @Input()
    field: FieldEntity;

    @Output()
    fieldChange = new EventEmitter();

    @ViewChild('paramsForm', { read: ViewContainerRef })
    private paramsFormContainer: ViewContainerRef;

    constructor(private dynamicFieldsService: DynamicFieldsService, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        const service = this.dynamicFieldsService.getService(this.field.type);
        if (!service) {
            return;
        }
        const resolver = service.getParamsComponentResolver();
        if (!resolver) {
            return;
        }

        const component = this.paramsFormContainer.createComponent(resolver);
        component.instance.field = this.field;
        component.instance.onSave$.subscribe(status => {
            if (status === OperationState.SUCCESS) {
                this.fieldChange.emit(status);
            }
        });
        this.cdr.detectChanges();
    }
}
