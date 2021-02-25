import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFieldFilterComponent } from '../../../../shared/modules/dynamic-fields/models/abstract-field-filter.component';
import { Filter } from '../../../../shared/modules/dynamic-fields/models/filter';
import { LocationFilterDto } from '../dto/location-filter.dto';
import { LocationParamsDto } from '../dto/location-params.dto';

@Component({
    selector: 'app-location-filter',
    templateUrl: './location-filter.component.html',
    styleUrls: ['./location-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationFilterComponent extends AbstractFieldFilterComponent<LocationParamsDto, LocationFilterDto> {
    getFilterValue(): Filter<LocationFilterDto> {
        return null;
    }

    dropFilters() {
        return;
    }
}
