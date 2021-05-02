import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFieldViewComponent } from '../../../models/abstract-field-view.component';
import { LocationEntity } from '../dto/location.entity';
import { LocationParamsDto } from '../dto/location-params.dto';

@Component({
    selector: 'app-location-view',
    templateUrl: './location-view.component.html',
    styleUrls: ['./location-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationViewComponent extends AbstractFieldViewComponent<LocationEntity, LocationParamsDto> {}
