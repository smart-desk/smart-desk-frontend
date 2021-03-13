import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    Input,
    OnChanges,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Model } from '../../../../shared/models/model/model.entity';
import { DynamicFieldsService } from '../../../../shared/modules/dynamic-fields/dynamic-fields.service';
import { SectionType } from '../../../../shared/models/section/section.entity';
import { AbstractFieldFilterComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-filter.component';
import { AdvertDataService } from '../../../../shared/services';
import { Filter, Filters } from '../../../../shared/modules/dynamic-fields/models/filter';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements AfterViewInit, OnChanges {
    @Input()
    model: Model;

    @Input()
    filters: Filters;

    @ViewChild('params', { read: ViewContainerRef })
    private paramsContainerRef: ViewContainerRef;

    @ViewChild('location', { read: ViewContainerRef })
    private locationContainerRef: ViewContainerRef;

    @ViewChild('price', { read: ViewContainerRef })
    private priceContainerRef: ViewContainerRef;

    private filterComponents: ComponentRef<AbstractFieldFilterComponent<any, any>>[] = [];

    constructor(
        private dynamicFieldService: DynamicFieldsService,
        private cdr: ChangeDetectorRef,
        private advertDataService: AdvertDataService
    ) {}

    ngAfterViewInit(): void {
        this.updateFilters();
    }

    ngOnChanges() {
        this.updateFilters();
    }

    apply(): void {
        const filters = this.filterComponents
            .map(c => c.instance.getFilterValue())
            .filter(f => !!f)
            .reduce((prev, cur) => ({ ...prev, ...cur.getFilterObject() }), {});

        this.advertDataService.applyFilters(filters);
    }

    dropFilters(): void {
        this.filters = {};
        this.advertDataService.applyFilters(this.filters);
        this.filterComponents.forEach(component => {
            component.instance.dropFilters();
            component.changeDetectorRef.detectChanges();
        });
        this.cdr.detectChanges();
    }

    private updateFilters(): void {
        if (!this.model || !this.model.sections) {
            return;
        }

        if (!this.paramsContainerRef || !this.priceContainerRef || !this.locationContainerRef) {
            return;
        }

        this.clearContainers();

        const containerTypeMap = new Map<SectionType, ViewContainerRef>();
        containerTypeMap.set(SectionType.PARAMS, this.paramsContainerRef);
        containerTypeMap.set(SectionType.PRICE, this.priceContainerRef);
        containerTypeMap.set(SectionType.LOCATION, this.locationContainerRef);

        containerTypeMap.forEach((container, type) => this.populateContainerWithFields(container, type));
    }

    private populateContainerWithFields(container: ViewContainerRef, sectionType: SectionType): AbstractFieldFilterComponent<any, any>[] {
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
                component.instance.filter = this.getFilterForField(field.id);
                component.changeDetectorRef.detectChanges();

                return component;
            })
            .filter(f => !!f);

        this.filterComponents = this.filterComponents.concat(components);
    }

    private clearContainers(): void {
        this.filterComponents = [];
        this.paramsContainerRef.clear();
        this.priceContainerRef.clear();
        this.locationContainerRef.clear();
    }

    private getFilterForField(fieldId: string): Filter<any> {
        if (!this.filters) {
            return;
        }

        return Object.entries(this.filters)
            .map(([key, params]) => new Filter(key, params))
            .find(filter => filter.getFieldId() === fieldId);
    }
}
