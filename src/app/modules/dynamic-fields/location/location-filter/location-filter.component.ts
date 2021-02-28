import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LocationFilterDto } from '../dto/location-filter.dto';
import { LocationParamsDto } from '../dto/location-params.dto';
import { AbstractFieldFilterComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-filter.component';
import { Filter } from '../../../../shared/modules/dynamic-fields/models/filter';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { Area } from '../location.class';

@Component({
    selector: 'app-location-filter',
    templateUrl: './location-filter.component.html',
    styleUrls: ['./location-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationFilterComponent extends AbstractFieldFilterComponent<LocationParamsDto, LocationFilterDto> {
    area: Area;

    constructor(private modalService: NzModalService, private cd: ChangeDetectorRef) {
        super();
    }

    getFilterValue(): Filter<LocationFilterDto> {
        const filterParams: LocationFilterDto = {
            lat: this.area.lat,
            lng: this.area.lng,
            radius: this.area.radius,
        };
        return new Filter(this.field.id, filterParams);
    }

    dropFilters() {
        return;
    }

    openLocationModal(): void {
        const modalRef = this.modalService.create({
            nzContent: LocationModalComponent,
            nzWidth: 848,
            nzFooter: null,
        });

        modalRef.afterClose.subscribe((area: Area) => {
            if (area) {
                this.area = area;
                this.cd.detectChanges();
            }
        });
    }
}
