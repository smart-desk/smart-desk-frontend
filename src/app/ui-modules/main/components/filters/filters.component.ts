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
import { Model } from '../../../../modules/model/models/model.entity';
import { Filter, Filters } from '../../../../modules/advert/models/filter';
import { AbstractFieldFilterComponent } from '../../../dynamic-fields/models/abstract-field-filter.component';
import { DynamicFieldsService } from '../../../dynamic-fields/dynamic-fields.service';
import { SectionType } from '../../../../modules/field/models/field.entity';
import { AdvertDataService } from '../../../../modules/advert/advert-data.service';

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
            .reduce((prev, cur) => ({ ...prev, ...cur?.getFilterObject() }), {});

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
        if (!this.model || !this.model.fields) {
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

    private populateContainerWithFields(
        container: ViewContainerRef,
        sectionType: SectionType
    ): AbstractFieldFilterComponent<any, any>[] | undefined {
        const fields = this.model.fields.filter(s => s.section === sectionType);
        if (!fields.length) {
            return;
        }

        const components = fields
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

        this.filterComponents = this.filterComponents.concat(
            components as ConcatArray<ComponentRef<AbstractFieldFilterComponent<any, any>>>
        );
    }

    private clearContainers(): void {
        this.filterComponents = [];
        this.paramsContainerRef.clear();
        this.priceContainerRef.clear();
        this.locationContainerRef.clear();
    }

    private getFilterForField(fieldId: string): Filter<any> | null {
        if (!this.filters) {
            return null;
        }

        return (
            Object.entries(this.filters)
                .map(([key, params]) => new Filter(key, params))
                .find(filter => filter?.getFieldId() === fieldId) || null
        );
    }
}
