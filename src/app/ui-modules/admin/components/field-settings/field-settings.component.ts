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
import { FieldEntity } from '../../../../modules/field/models/field.entity';
import { OperationState } from '../../../../modules/field/models/operation-state.enum';
import { DynamicFieldsService } from '../../../dynamic-fields/dynamic-fields.service';
import { AbstractFieldParamsComponent } from '../../../dynamic-fields/models/abstract-field-params.component';
import { FieldService } from '../../../../modules/field/field.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
    fieldChange = new EventEmitter<OperationState>();

    operationState = OperationState;
    state: OperationState;

    @ViewChild('paramsForm', { read: ViewContainerRef })
    private paramsFormContainer: ViewContainerRef;
    private component: ComponentRef<AbstractFieldParamsComponent<any>>;

    constructor(
        private dynamicFieldsService: DynamicFieldsService,
        private cdr: ChangeDetectorRef,
        private fieldService: FieldService,
        private notificationService: NzNotificationService
    ) {}

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
        this.updateState(OperationState.LOADING);
        const isValid = this.component.instance.isValid();
        if (!isValid) {
            this.updateState(OperationState.ERROR);
            return;
        }
        const field = this.component.instance.getField();
        const request = field.id ? this.fieldService.updateField(field.id, field) : this.fieldService.createField(field);

        request.subscribe(
            () => {
                this.updateState(OperationState.SUCCESS);
            },
            err => {
                if (err?.error?.statusCode === 400) {
                    this.notificationService.error('Проверьте правильность заполнения формы', err?.error?.message?.join(', '));
                } else {
                    this.notificationService.error('Что-то пошло не так', 'Попробуйте перезагрузить страницу');
                }
                this.updateState(OperationState.ERROR);
            }
        );
    }

    private updateState(state: OperationState): void {
        this.state = state;
        this.fieldChange.emit(this.state);
        this.cdr.detectChanges();
    }
}
