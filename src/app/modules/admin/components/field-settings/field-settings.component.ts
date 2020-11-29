import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';

@Component({
    selector: 'app-field-settings',
    templateUrl: './field-settings.component.html',
    styleUrls: ['./field-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldSettingsComponent implements AfterViewInit {
    @Input()
    field: FieldEntity;

    @ViewChild('paramsForm', { read: ViewContainerRef })
    paramsFormContainer: ViewContainerRef;

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
        this.cdr.detectChanges();
    }
}
