import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertDataService, CategoryService, ModelService } from '../../../../services';
import { GetAdvertsResponseDto } from '../../../../models/advert/advert.dto';
import { Model } from '../../../../models/model/model.entity';
import { FieldEntity, FieldType } from '../../../../models/field/field.entity';
import { Direction } from '../../enums/direction.enum';
import { Category } from '../../../../models/category/category.entity';
import { Sorting } from '../../interfaces/sorting.interface';

@Component({
    selector: 'app-sorting',
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingComponent implements OnInit {
    @Input() model: Model;
    @Input() category: Category;
    @Input() sorting: Sorting;
    selectedField = '';
    advertsResponse: GetAdvertsResponseDto;
    defaultSelect = 'По умолчанию';
    sortDirection = Direction;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private modelService: ModelService,
        private advertDataService: AdvertDataService
    ) {}

    ngOnInit(): void {
        this.selectedField = this.defaultSelect;
        if (this.sorting) {
            this.selectedField = `${this.sorting.field}:${this.sorting.direction}`;
        }
    }

    changeSelect($event: string): void {
        if ($event === this.defaultSelect) {
            this.runSorting('');
        } else {
            this.runSorting($event);
        }
    }

    getPriceField(): FieldEntity[] {
        return this.model?.fields.filter(field => field.type === FieldType.PRICE);
    }

    private runSorting(param: string): void {
        if (param) {
            const [fieldId, direction] = param.split(':');
            return this.advertDataService.changeSorting(
                {
                    field: fieldId,
                    direction: direction as Direction,
                },
                this.category.id
            );
        }
        return this.advertDataService.changeSorting(null, this.category.id);
    }
}
