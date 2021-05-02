import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewChild,
    ViewContainerRef,
    EventEmitter,
} from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { FieldEntity } from '../../../shared/models/field/field.entity';
import { DynamicFieldsService } from '../../../shared/modules/dynamic-fields/dynamic-fields.service';

/**
 * todo this component may become a directive when this issue will be resolved
 * https://github.com/angular/angular/issues/8785
 *
 * Angular roadmap
 * https://angular.io/guide/roadmap#support-adding-directives-to-host-elements
 */
@Component({
    selector: 'app-preview-tools',
    templateUrl: './preview-tools.component.html',
    styleUrls: ['./preview-tools.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewToolsComponent implements AfterViewInit {
    @Input()
    field: FieldEntity;

    @Output()
    edit = new EventEmitter<FieldEntity>();

    @Output()
    delete = new EventEmitter<FieldEntity>();

    @ViewChild('field', { read: ViewContainerRef })
    private fieldContainerRef: ViewContainerRef;

    constructor(
        private dynamicFieldsService: DynamicFieldsService,
        private drawerService: NzDrawerService,
        private cdr: ChangeDetectorRef
    ) {}

    onEdit() {
        this.edit.emit(this.field);
    }

    onDelete() {
        this.delete.emit(this.field);
    }

    ngAfterViewInit() {
        const service = this.dynamicFieldsService.getService(this.field.type);
        if (!service) {
            return;
        }
        const resolver = service.getFormComponentResolver();
        if (!resolver) {
            return;
        }
        const component = this.fieldContainerRef.createComponent(resolver);
        component.instance.field = this.field;

        this.cdr.detectChanges();
    }
}
