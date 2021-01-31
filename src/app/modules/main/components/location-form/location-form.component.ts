import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import MapsEventListener = google.maps.MapsEventListener;
import { MapsAPILoader } from '@agm/core';
import { take } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import GeocoderResult = google.maps.GeocoderResult;
import PlaceResult = google.maps.places.PlaceResult;

@Component({
    selector: 'app-location-form',
    templateUrl: './location-form.component.html',
    styleUrls: ['./location-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationFormComponent implements AfterViewInit {
    @ViewChild('search')
    searchElementRef: ElementRef;
    address = '';
    map: google.maps.Map;
    geocoder: google.maps.Geocoder;
    autocomplete: google.maps.places.Autocomplete;
    mapClickListener: MapsEventListener;
    autocompleteListener: MapsEventListener;
    zoom: number = 8;
    lat: number = 51.673858;
    lng: number = 7.815982;

    constructor(private zone: NgZone, private mapsAPILoader: MapsAPILoader, private cdr: ChangeDetectorRef) {}

    // todo set marker on place
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

    private updateAddress(place: GeocoderResult | PlaceResult): void {
        if (place.geometry === undefined || place.geometry === null) {
            return;
        }
        this.address = place.formatted_address;
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        this.zoom = 12;
        this.cdr.detectChanges();
    }
}
