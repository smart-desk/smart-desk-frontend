import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    Input,
    OnChanges,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Model } from '../../../../modules/model/models/model.entity';
import { Filter, Filters } from '../../../../modules/product/models/filter';
import { AbstractFieldFilterComponent } from '../../../dynamic-fields/models/abstract-field-filter.component';
import { DynamicFieldsService } from '../../../dynamic-fields/dynamic-fields.service';
import { SectionType } from '../../../../modules/field/models/field.entity';
import { ProductDataEvents, ProductDataService } from '../../../../modules/product/product-data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements AfterViewInit, OnDestroy, OnChanges {
    @Input()
    model: Model;

    @Input()
    filters: Filters;

    sectionType = SectionType;

    showSection: Record<SectionType, boolean> = {
        params: true,
        contacts: false,
        location: true,
        price: true,
    };

    activeFilters = 0;

    @ViewChild('params', { read: ViewContainerRef })
    private paramsContainerRef: ViewContainerRef;

    @ViewChild('location', { read: ViewContainerRef })
    private locationContainerRef: ViewContainerRef;

    @ViewChild('price', { read: ViewContainerRef })
    private priceContainerRef: ViewContainerRef;

    private filterComponents: ComponentRef<AbstractFieldFilterComponent<any, any>>[] = [];
    private destroy$ = new Subject();
    private filterSubscriptions: Subscription[] = [];

    constructor(
        private dynamicFieldService: DynamicFieldsService,
        private cdr: ChangeDetectorRef,
        private productDataService: ProductDataService
    ) {
        this.productDataService.events$.pipe(takeUntil(this.destroy$)).subscribe(event => {
            if (event === ProductDataEvents.DROP_FILTERS) {
                this.filters = {};
                this.filterComponents.forEach(component => {
                    component.instance.dropFilters();
                    component.changeDetectorRef.detectChanges();
                });
                this.cdr.detectChanges();
            }
        });
    }

    ngOnChanges(): void {
        this.updateFilters();
    }

    ngAfterViewInit(): void {
        this.updateFilters();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    apply(): void {
        const filters = this.filterComponents
            .map(c => c.instance.getFilterValue())
            .filter(f => {
                if (!f) {
                    return false;
                }
                if (Array.isArray(f.getFilterParams())) {
                    return f.getFilterParams().length > 0;
                }
                if (f.getFilterParams()) {
                    return true;
                }
            })
            .reduce((prev, cur) => ({ ...prev, ...cur?.getFilterObject() }), {});

        this.productDataService.applyFilters(filters);
    }

    dropFilters(): void {
        this.filters = {};
        this.productDataService.dropFilters();
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
        this.setFilterListener();
        this.recountFilters();
    }

    private populateContainerWithFields(
        container: ViewContainerRef,
        sectionType: SectionType
    ): AbstractFieldFilterComponent<any, any>[] | undefined {
        const fields = this.model.fields.filter(s => s.section === sectionType);
        if (!fields.length) {
            this.showSection[sectionType] = false;
            this.cdr.detectChanges();
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

    private setFilterListener(): void {
        this.filterSubscriptions.forEach(s => s.unsubscribe());
        this.filterSubscriptions = this.filterComponents.map(component => {
            return component.instance.onFormChange$.pipe(takeUntil(this.destroy$)).subscribe(() => this.recountFilters());
        });
    }

    private recountFilters(): void {
        this.activeFilters = 0;
        this.filterComponents.forEach(component => (this.activeFilters += component.instance.getActiveFilters()));
        this.cdr.detectChanges();
    }
}
