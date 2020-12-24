import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Model } from "../../../../shared/models/dto/model.entity";

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
    @Input()
    model: Model;
}
