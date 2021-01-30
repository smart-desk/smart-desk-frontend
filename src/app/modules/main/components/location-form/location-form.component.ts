import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import MapsEventListener = google.maps.MapsEventListener;
import { AgmGeocoder, MapsAPILoader } from '@agm/core';
import { take } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

@Component({
    selector: 'app-location-form',
    templateUrl: './location-form.component.html',
    styleUrls: ['./location-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationFormComponent {
    address: string;
    map: google.maps.Map;
    geocoder: google.maps.Geocoder;
    mapClickListener: MapsEventListener;
    zoom: number = 8;
    lat: number = 51.673858;
    lng: number = 7.815982;

    constructor(private zone: NgZone, private mapsAPILoader: MapsAPILoader, private cdr: ChangeDetectorRef) {
        fromPromise(this.mapsAPILoader.load())
            .pipe(take(1))
            .subscribe(() => (this.geocoder = new google.maps.Geocoder()));
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
                this.address = results[0].formatted_address;
            } else {
                // todo should throw sentry message
                console.warn(status);
            }
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy(): void {
        if (this.mapClickListener) {
            this.mapClickListener.remove();
        }
    }
}
