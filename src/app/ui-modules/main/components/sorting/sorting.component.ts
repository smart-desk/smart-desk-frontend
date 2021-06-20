import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Direction } from '../../../../modules/advert/models/direction.enum';
import { Sorting } from '../../../../modules/advert/models/sorting.interface';
import { Model } from '../../../../modules/model/models/model.entity';
import { AdvertDataService, CategoryService, ModelService } from '../../../../modules';
import { FieldEntity, FieldType } from '../../../../modules/field/models/field.entity';

@Component({
    selector: 'app-sorting',
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingComponent implements OnInit {
    @Input() model: Model;
    @Input() sorting: Sorting;
    selectedField = '';
    sortDirection = Direction;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private modelService: ModelService,
        private advertDataService: AdvertDataService
    ) {}

    ngOnInit(): void {
        if (this.sorting) {
            this.selectedField = `${this.sorting.field}:${this.sorting.direction}`;
        }
    }

    changeSelect(sortValue: string): void {
        if (sortValue) {
            const [fieldId, direction] = sortValue.split(':');
            return this.advertDataService.changeSorting({
                field: fieldId,
                direction: direction as Direction,
            });
        } else {
            return this.advertDataService.changeSorting(null);
        }
    }

    getPriceField(): FieldEntity[] {
        return this.model?.fields.filter(field => field.type === FieldType.PRICE);
    }
}
