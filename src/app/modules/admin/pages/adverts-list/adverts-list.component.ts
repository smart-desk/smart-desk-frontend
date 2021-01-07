import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdvertService, CategoryService } from '../../../../shared/services';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { zip } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Advert } from '../../../../shared/models/dto/advert.entity';
import { Category } from '../../../../shared/models/dto/category.entity';
import { GetAdvertsDto } from '../../../../shared/models/dto/advert.dto';

@Component({
    selector: 'app-table-adverts',
    templateUrl: './adverts-list.component.html',
    styleUrls: ['./adverts-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertsListComponent implements OnInit {
    listAdverts: Advert[];
    selectedItems = new Set<string>();
    pageIndex = 1;
    pageSize = 20;
    totalAdverts: number;
    categories: Category[] = [];

    constructor(
        private advertService: AdvertService,
        private router: Router,
        private categoryService: CategoryService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.getAdverts();
        this.categoryService.getCategories().subscribe(categories => (this.categories = categories));
    }

    delete(id: string): void {
        this.advertService.deleteAdvert(id).subscribe(() => {
            this.listAdverts = this.listAdverts.filter(item => item.id !== id);
            this.cd.detectChanges();
        });
    }

    deleteSelectedAdverts(): void {
        const requests = [...this.selectedItems].map(id =>
            this.advertService.deleteAdvert(id).pipe(
                tap(() => {
                    this.listAdverts = this.listAdverts.filter(item => item.id !== id);
                    this.selectedItems.delete(id);
                })
            )
        );

        zip(...requests).subscribe(() => this.cd.detectChanges());
    }

    edit(id: string): void {
        this.router.navigate([`/adverts/${id}/edit`]);
    }

    updateSelectedItems(id: string, checked: boolean): void {
        if (checked) {
            this.selectedItems.add(id);
        } else {
            this.selectedItems.delete(id);
        }
    }

    changePage(page: number): void {
        if (page !== this.pageIndex) {
            this.pageIndex = page;
            const options = new GetAdvertsDto();
            options.page = page;
            this.getAdverts(options);
        }
    }

    formatDate(date: string): string {
        return dayjs(date).format('DD-MM-YYYY HH:mm:ss');
    }

    getCategoryName(id: string): string {
        const categoryAdvert = this.categories.find(category => category.id === id);
        return categoryAdvert ? categoryAdvert.name : 'Категория не определена';
    }

    private getAdverts(options?: GetAdvertsDto): void {
        this.advertService.getAdverts(options).subscribe(advertMeta => {
            this.listAdverts = advertMeta.adverts;
            this.totalAdverts = advertMeta.totalCount;
            this.pageSize = advertMeta.limit;
            this.cd.detectChanges();
        });
    }
}
