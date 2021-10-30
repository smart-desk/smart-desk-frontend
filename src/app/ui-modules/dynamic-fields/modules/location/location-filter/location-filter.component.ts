import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LocationFilterDto } from '../dto/location-filter.dto';
import { LocationParamsDto } from '../dto/location-params.dto';
import { fromPromise } from 'rxjs/internal-compatibility';
import { MapsAPILoader } from '@agm/core';
import { AbstractFieldFilterComponent } from '../../../models/abstract-field-filter.component';
import { Filter } from '../../../../../modules/product/models/filter';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { Area } from '../location.class';

@Component({
    selector: 'app-location-filter',
    templateUrl: './location-filter.component.html',
    styleUrls: ['./location-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationFilterComponent extends AbstractFieldFilterComponent<LocationParamsDto, LocationFilterDto> implements OnInit {
    area: Area | undefined;
    private geocoder: google.maps.Geocoder;

    constructor(private mapsAPILoader: MapsAPILoader, private modalService: NzModalService, private cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        const areaFromStorage = localStorage.getItem(this.field.id);
        if (this.filter?.getFilterParams()) {
            this.area = new Area();
            this.area.radius = this.filter.getFilterParams().radius;
            this.area.lat = this.filter.getFilterParams().lat;
            this.area.lng = this.filter.getFilterParams().lng;
        } else if (areaFromStorage) {
            try {
                this.area = JSON.parse(areaFromStorage) as Area;
            } catch (err) {
                return;
            }
        } else {
            return;
        }

        fromPromise(this.mapsAPILoader.load()).subscribe(() => {
            if (!this.area) {
                return;
            }
            this.geocoder = new google.maps.Geocoder();
            this.geocoder.geocode({ location: { lat: this.area.lat, lng: this.area.lng } }, (results, status) => {
                if (status === 'OK') {
                    const place = results[0];
                    if (this.area) {
                        this.area.title = place?.formatted_address;
                    }
                } else {
                    // todo should throw sentry message
                    console.warn(status);
                }
                this.cd.detectChanges();
            });
        });

        this.cd.detectChanges();
    }

    getActiveFilters(): number {
        if (this.area) {
            return 1;
        }
        return 0;
    }

    getFilterValue(): Filter<LocationFilterDto> | null {
        if (!this.area) {
            return null;
        }

        const filterParams: LocationFilterDto = {
            lat: this.area.lat,
            lng: this.area.lng,
            radius: this.area.radius,
        };
        return new Filter(this.field.id, filterParams, true);
    }

    dropFilters() {
        this.area = undefined;
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
            if (area && area.lat && area.lng) {
                this.area = area;
                this.cd.detectChanges();
            }
        });
    }
}
