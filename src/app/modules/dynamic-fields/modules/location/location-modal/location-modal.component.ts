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
import { MapsAPILoader } from '@agm/core';
import { take } from 'rxjs/operators';
import { isNil } from 'ng-zorro-antd/core/util';
import { fromPromise } from 'rxjs/internal-compatibility';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Area } from '../location.class';

const METERS_IN_KM = 1000;

@Component({
    selector: 'app-location-form',
    templateUrl: './location-modal.component.html',
    styleUrls: ['./location-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationModalComponent implements AfterViewInit, OnDestroy, OnInit {
    zoom = 12;
    area: Area;
    mapCircle: google.maps.Circle;

    @ViewChild('search')
    private searchElementRef: ElementRef;

    private map: google.maps.Map;
    private geocoder: google.maps.Geocoder;
    private autocomplete: google.maps.places.Autocomplete;
    private mapClickListener: google.maps.MapsEventListener;
    private autocompleteListener: google.maps.MapsEventListener;

    constructor(
        private zone: NgZone,
        private mapsAPILoader: MapsAPILoader,
        private cdr: ChangeDetectorRef,
        private nzModalRef: NzModalRef
    ) {}

    ngOnInit() {
        if (!this.area) {
            this.area = new Area();
            this.area.lng = 2.2592045;
            this.area.lat = 48.8286554;
            this.area.radius = 10;
        }
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
                        this.updateArea(place);
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
        this.mapCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.map,
            center: { lat: this.area.lat, lng: this.area.lng },
            radius: this.area.radius * METERS_IN_KM,
        });
    }

    onMapClick(e: google.maps.MouseEvent): void {
        this.geocoder.geocode({ location: e.latLng }, (results, status) => {
            if (status === 'OK') {
                const place = results[0];
                // todo update autocomplete
                this.updateArea(place);
            } else {
                // todo should throw sentry message
                console.warn(status);
            }
            this.cdr.detectChanges();
        });
    }

    saveArea() {
        this.nzModalRef.close(this.area);
    }

    closeModal() {
        this.nzModalRef.close();
    }

    changeRadius(radius: number) {
        this.mapCircle.setRadius(radius * METERS_IN_KM);
    }

    private updateArea(place: google.maps.GeocoderResult | google.maps.places.PlaceResult): void {
        if (isNil(place.geometry)) {
            return;
        }
        this.area.title = place.formatted_address as string;
        this.area.lat = place.geometry.location.lat();
        this.area.lng = place.geometry.location.lng();
        this.mapCircle.setCenter({ lng: this.area.lng, lat: this.area.lat });
        this.cdr.detectChanges();
    }
}
