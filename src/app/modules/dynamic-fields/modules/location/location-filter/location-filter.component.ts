import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LocationFilterDto } from '../dto/location-filter.dto';
import { LocationParamsDto } from '../dto/location-params.dto';
import { fromPromise } from 'rxjs/internal-compatibility';
import { MapsAPILoader } from '@agm/core';
import { AbstractFieldFilterComponent } from '../../../models/abstract-field-filter.component';
import { Filter } from '../../../models/filter';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { Area } from '../location.class';

@Component({
    selector: 'app-location-filter',
    templateUrl: './location-filter.component.html',
    styleUrls: ['./location-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationFilterComponent extends AbstractFieldFilterComponent<LocationParamsDto, LocationFilterDto> implements OnInit {
    area: Area;
    private geocoder: google.maps.Geocoder;

    constructor(private mapsAPILoader: MapsAPILoader, private modalService: NzModalService, private cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        if (!this.filter || !this.filter.getFilterParams()) {
            return;
        }

        this.area = new Area();
        this.area.radius = this.filter.getFilterParams().radius;
        this.area.lat = this.filter.getFilterParams().lat;
        this.area.lng = this.filter.getFilterParams().lng;

        fromPromise(this.mapsAPILoader.load()).subscribe(() => {
            this.geocoder = new google.maps.Geocoder();
            this.geocoder.geocode({ location: { lat: this.area.lat, lng: this.area.lng } }, (results, status) => {
                if (status === 'OK') {
                    const place = results[0];
                    this.area.title = place?.formatted_address;
                } else {
                    // todo should throw sentry message
                    console.warn(status);
                }
                this.cd.detectChanges();
            });
        });

        this.cd.detectChanges();
    }

    getFilterValue(): Filter<LocationFilterDto> {
        if (!this.area) {
            return {} as Filter<LocationFilterDto>;
        }

        const filterParams: LocationFilterDto = {
            lat: this.area.lat,
            lng: this.area.lng,
            radius: this.area.radius,
        };
        return new Filter(this.field.id, filterParams);
    }

    dropFilters() {
        this.area = {} as Area;
        this.cd.detectChanges();
    }

    openLocationModal(): void {
        const modalRef = this.modalService.create({
            nzContent: LocationModalComponent,
            nzWidth: 848,
            nzFooter: null,
            nzComponentParams: { area: this.area },
        });

        modalRef.afterClose.subscribe((area: Area) => {
            if (area) {
                this.area = area;
                this.cd.detectChanges();
            }
        });
    }
}
