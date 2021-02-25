import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFieldFormComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-form.component';
import { LocationEntity } from '../dto/location.entity';
import { LocationParamsDto } from '../dto/location-params.dto';

@Component({
    selector: 'app-location-form',
    templateUrl: './location-form.component.html',
    styleUrls: ['./location-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationFormComponent extends AbstractFieldFormComponent<LocationEntity, LocationParamsDto> {
    getFieldData(): LocationEntity {
        return null;
    }

    isFieldDataValid(): boolean {
        return true;
    }
}
