import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertDataService, CategoryService, ModelService } from '../../../../services';
import { Model } from '../../../../models/model/model.entity';
import { FieldEntity, FieldType } from '../../../../models/field/field.entity';
import { Direction } from '../../enums/direction.enum';
import { Sorting } from '../../interfaces/sorting.interface';

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
