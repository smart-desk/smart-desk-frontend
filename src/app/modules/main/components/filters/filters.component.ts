import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Model } from '../../../../shared/models/dto/model.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';
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

        const containerTypeMap = new Map<SectionType, ViewContainerRef>();
        containerTypeMap.set(SectionType.PARAMS, this.paramsContainerRef);
        containerTypeMap.set(SectionType.PRICE, this.priceContainerRef);
        containerTypeMap.set(SectionType.LOCATION, this.locationContainerRef);

        containerTypeMap.forEach((container, type) => this.populateContainerWithFields(container, type));

        this.cdr.detectChanges();
    }

    apply(): void {
        const filters = this.components.map(c => c.getFilterValue()).filter(f => !!f);
        console.log(filters);
    }

    private populateContainerWithFields(container: ViewContainerRef, sectionType: SectionType): AbstractFieldFilterComponent<any>[] {
        const section = this.model.sections.find(s => s.type === sectionType);
        if (!section) {
            return;
        }

        const components = section.fields
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

        this.components = this.components.concat(components);
    }
}
