import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
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
export class FiltersComponent implements AfterViewInit, OnChanges {
    @Input()
    model: Model;

    @ViewChild('params', { read: ViewContainerRef })
    private paramsContainerRef: ViewContainerRef;

    @ViewChild('location', { read: ViewContainerRef })
    private locationContainerRef: ViewContainerRef;

    @ViewChild('price', { read: ViewContainerRef })
    private priceContainerRef: ViewContainerRef;

    private filterComponents: AbstractFieldFilterComponent<any>[] = [];

    constructor(private dynamicFieldService: DynamicFieldsService, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.updateFilters();
    }

    ngOnChanges() {
        this.updateFilters();
    }

    apply(): void {
        const filters = this.filterComponents.map(c => c.getFilterValue()).filter(f => !!f);
        console.log(filters);
    }

    private updateFilters(): void {
        if (!this.model || !this.model.sections) return;

        if (!this.paramsContainerRef || !this.priceContainerRef || !this.locationContainerRef) return;

        this.clearContainers();

        const containerTypeMap = new Map<SectionType, ViewContainerRef>();
        containerTypeMap.set(SectionType.PARAMS, this.paramsContainerRef);
        containerTypeMap.set(SectionType.PRICE, this.priceContainerRef);
        containerTypeMap.set(SectionType.LOCATION, this.locationContainerRef);

        containerTypeMap.forEach((container, type) => this.populateContainerWithFields(container, type));
    }

    private populateContainerWithFields(container: ViewContainerRef, sectionType: SectionType): AbstractFieldFilterComponent<any>[] {
        const section = this.model.sections.find(s => s.type === sectionType);
        if (!section) return;

        const components = section.fields
            .map(field => {
                if (!field.filterable) return;

                const service = this.dynamicFieldService.getService(field.type);
                if (!service) return;

                const resolver = service.getFilterComponentResolver();
                if (!resolver) return;

                const component = container.createComponent(resolver);
                component.instance.field = field;
                component.changeDetectorRef.detectChanges();

                return component.instance;
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
}
