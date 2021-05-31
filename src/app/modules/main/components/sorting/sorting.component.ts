import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AdvertDataService, CategoryService, ModelService } from '../../../../services';
import { GetAdvertsDto, GetAdvertsResponseDto } from '../../../../models/advert/advert.dto';
import { Model } from '../../../../models/model/model.entity';
import { SortingMode, SortingField } from '../../interfaces/sorting-field.interface';
import { FieldType } from '../../../../models/field/field.entity';

@Component({
    selector: 'app-sorting',
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingComponent implements OnInit {
    selectedField = null;
    advertsResponse: GetAdvertsResponseDto;
    sortingFields: SortingField[] = [
        { label: 'Подешевле', mode: SortingMode.ASC, field: FieldType.PRICE },
        { label: 'Подороже', mode: SortingMode.DESC, field: FieldType.PRICE },
    ];
    private model: Model;
    private destroy$ = new Subject();
    private categoryId: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private modelService: ModelService,
        private advertDataService: AdvertDataService
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                takeUntil(this.destroy$),
                switchMap((paramMap: ParamMap) => {
                    this.categoryId = paramMap.get('category_id') || '';
                    return this.categoryService.getCategory(this.categoryId);
                }),
                switchMap(category => {
                    return this.modelService.getModel(category.modelId);
                })
            )
            .subscribe(model => {
                this.model = model;
            });
    }

    changeSelect($event: any): void {
        this.sorting($event);
    }

    private sorting(param: { label: string; mode: string; field: string }): void {
        const fieldSorting = this.model.fields.find(field => field.type === param.field);
        if (fieldSorting?.id) {
            const options = {
                sortingField: fieldSorting.id,
                sortingMode: param.mode,
            } as GetAdvertsDto;
            this.advertDataService.loadAdverts(this.categoryId, options);
        }
    }
}
