import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    NgZone,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { fromPromise } from 'rxjs/internal-compatibility';
import { take } from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
import { AbstractFieldFormComponent } from '../../../models/abstract-field-form.component';
import { LocationEntity } from '../dto/location.entity';
import { LocationParamsDto } from '../dto/location-params.dto';

@Component({
    selector: 'app-location-form',
    templateUrl: './location-form.component.html',
    styleUrls: ['./location-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationFormComponent extends AbstractFieldFormComponent<LocationEntity, LocationParamsDto>
    implements AfterViewInit, OnInit, OnDestroy {
    map: google.maps.Map;
    zoom = 12;
    location: LocationEntity;
    showMap = false;

    @ViewChild('search')
    private searchElementRef: ElementRef;

    private geocoder: google.maps.Geocoder;
    private autocomplete: google.maps.places.Autocomplete;
    private mapClickListener: google.maps.MapsEventListener;
    private autocompleteListener: google.maps.MapsEventListener;

    constructor(private zone: NgZone, private mapsAPILoader: MapsAPILoader, private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        this.location = new LocationEntity();
        this.location.lat = this.field?.data?.lat || 48.8286554;
        this.location.lng = this.field?.data?.lng || 2.2592045;
        this.location.title = this.field?.data?.title || '';
        this.cdr.detectChanges();
    }

    ngAfterViewInit() {
        fromPromise(this.mapsAPILoader.load())
            .pipe(take(1))
            .subscribe(() => {
                this.geocoder = new google.maps.Geocoder();
                this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
                this.autocompleteListener = this.autocomplete.addListener('place_changed', () => {
                    this.zone.run(() => {
                        const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
                        this.updateAddress(place);
                    });
                });
            });
    }

    ngOnDestroy(): void {
        if (this.mapClickListener) {
            this.mapClickListener.remove();
        }
        if (this.autocompleteListener) {
            this.autocompleteListener.remove();
        }
    }

    mapReadyHandler(map: google.maps.Map): void {
        this.map = map;
        // todo it is a workaround for (mapClick)="onMapClick($event)"
        this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
            this.zone.run(() => this.onMapClick(e));
        });
    }

    onMapClick(e: google.maps.MouseEvent): void {
        this.geocoder.geocode({ location: e.latLng }, (results, status) => {
            if (status === 'OK') {
                const place = results[0];
                // todo update autocomplete
                this.updateAddress(place);
            } else {
                // todo should throw sentry message
                console.warn(status);
            }
            this.cdr.detectChanges();
        });
    }

    getFieldData(): LocationEntity {
        if (this.field?.data?.id) {
            this.field.data.lat = this.location.lat;
            this.field.data.lng = this.location.lng;
            this.field.data.title = this.location.title;
            return this.field.data;
        }

        const location = new LocationEntity();
        location.lat = this.location.lat;
        location.lng = this.location.lng;
        location.title = this.location.title;
        location.fieldId = this.field.id;
        return location;
    }

    isFieldDataValid(): boolean {
        // todo check if field is required
        return true;
    }

    toggleMap() {
        this.showMap = !this.showMap;
        this.cdr.detectChanges();
    }

    private updateAddress(place: google.maps.GeocoderResult | google.maps.places.PlaceResult): void {
        if (place.geometry === undefined || place.geometry === null) {
            return;
        }
        this.location.title = place.formatted_address || '';
        this.location.lat = place.geometry.location.lat();
        this.location.lng = place.geometry.location.lng();
        this.cdr.detectChanges();
    }
}
