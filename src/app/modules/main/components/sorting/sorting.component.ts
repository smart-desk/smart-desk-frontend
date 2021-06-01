import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertDataService, CategoryService, ModelService } from '../../../../services';
import { GetAdvertsDto, GetAdvertsResponseDto } from '../../../../models/advert/advert.dto';
import { Model } from '../../../../models/model/model.entity';
import { FieldEntity, FieldType } from '../../../../models/field/field.entity';
import { Direction } from '../../enums/direction.enum';
import { Category } from '../../../../models/category/category.entity';

@Component({
    selector: 'app-sorting',
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingComponent implements OnInit {
    @Input() model: Model;
    @Input() category: Category;
    @Input() options: GetAdvertsDto;
    selectedField = '';
    advertsResponse: GetAdvertsResponseDto;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private modelService: ModelService,
        private advertDataService: AdvertDataService
    ) {}

    ngOnInit(): void {
        if (this.options.sorting) {
            this.selectedField = `${this.options.sorting.field}:${this.options.sorting.direction}`;
        }
    }

    changeSelect($event: any): void {
        this.sorting($event);
    }

    getPriceField(): FieldEntity[] {
        return this.model?.fields.filter(field => field.type === FieldType.PRICE);
    }

    private sorting(param: string): void {
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
        return this.advertDataService.changeSorting({} as { field: string; direction: Direction }, this.category.id);
    }
}
