import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Model } from '../../../../shared/models/dto/model.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';
import { FieldEntity } from '../../../../shared/models/dto/field.entity';
import { SectionType } from '../../../../shared/models/dto/section.entity';
import { AbstractFieldFilterComponent } from '../../../../shared/modules/dynamic-fields/abstract-field-filter.component';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements AfterViewInit {
    @Input()
    model: Model;

    @ViewChild('params', { read: ViewContainerRef })
    private paramsContainerRef: ViewContainerRef;

    @ViewChild('location', { read: ViewContainerRef })
    private locationContainerRef: ViewContainerRef;

    @ViewChild('price', { read: ViewContainerRef })
    private priceContainerRef: ViewContainerRef;

    private components: AbstractFieldFilterComponent<any>[] = [];

    constructor(private dynamicFieldService: DynamicFieldsService, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        if (!this.model || !this.model.sections) {
            return;
        }

        this.addParamsFields();
        this.addPriceFields();
        this.addLocationFields();

        this.cdr.detectChanges();
    }

    apply(): void {
        const filters = this.components.map(c => c.getFilterValue()).filter(f => !!f);
        console.log(filters);
    }

    private addParamsFields(): void {
        const section = this.model.sections.find(s => s.type === SectionType.PARAMS);
        if (section) {
            this.components = this.components.concat(this.populateContainerWithFields(this.paramsContainerRef, section.fields));
        }
    }

    private addPriceFields(): void {
        const section = this.model.sections.find(s => s.type === SectionType.PRICE);
        if (section) {
            this.components = this.components.concat(this.populateContainerWithFields(this.priceContainerRef, section.fields));
        }
    }

    private addLocationFields(): void {
        const section = this.model.sections.find(s => s.type === SectionType.LOCATION);
        if (section) {
            this.components = this.components.concat(this.populateContainerWithFields(this.locationContainerRef, section.fields));
        }
    }

    private populateContainerWithFields(container: ViewContainerRef, fields: FieldEntity[]): AbstractFieldFilterComponent<any>[] {
        return fields
            .map(field => {
                if (!field.filterable) {
                    return;
                }

                const service = this.dynamicFieldService.getService(field.type);
                if (!service) {
                    return;
                }

                const resolver = service.getFilterComponentResolver();
                if (!resolver) {
                    return;
                }

                const component = container.createComponent(resolver);
                component.instance.field = field;
                component.changeDetectorRef.detectChanges();

                return component.instance;
            })
            .filter(f => !!f);
    }
}
