import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Direction } from '../../../../modules/product/models/direction.enum';
import { Sorting } from '../../../../modules/product/models/sorting.interface';
import { Model } from '../../../../modules/model/models/model.entity';
import { FieldEntity, FieldType } from '../../../../modules/field/models/field.entity';
import { ModelService } from '../../../../modules/model/model.service';
import { ProductDataService } from '../../../../modules/product/product-data.service';

@Component({
    selector: 'app-sorting',
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingComponent implements OnInit {
    @Input() model: Model;
    @Input() sorting: Sorting;
    DEFAULT_SORTING = 'DEFAULT_SORTING';
    selectedField = this.DEFAULT_SORTING;
    sortDirection = Direction;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private modelService: ModelService,
        private productDataService: ProductDataService
    ) {}

    ngOnInit(): void {
        if (this.sorting) {
            this.selectedField = `${this.sorting.field}:${this.sorting.direction}`;
        }
    }

    changeSelect(sortValue: string): void {
        if (sortValue !== this.DEFAULT_SORTING) {
            const [fieldId, direction] = sortValue.split(':');
            return this.productDataService.changeSorting({
                field: fieldId,
                direction: direction as Direction,
            });
        } else {
            return this.productDataService.changeSorting(null);
        }
    }

    getPriceField(): FieldEntity[] {
        return this.model?.fields.filter(field => field.type === FieldType.PRICE);
    }
}
