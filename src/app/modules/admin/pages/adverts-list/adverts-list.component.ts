import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdvertRequestOptions, AdvertService, CategoryService } from '../../../../shared/services';
import { Advert, Category } from '../../../../shared/models/models.dto';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';

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
        this.getAdverts({ page: this.pageIndex });
        this.categoryService.getCategories().subscribe(categories => (this.categories = categories));
    }

    delete(id?: string): void {
        this.advertService.deleteAdvert(id).subscribe();
        this.listAdverts = this.listAdverts.filter(item => item.id !== id);
        this.cd.detectChanges();
    }

    deleteSelectedAdverts(): void {
        this.selectedItems.forEach(id => {
            this.advertService.deleteAdvert(id).subscribe(() => {
                this.listAdverts = this.listAdverts.filter(item => item.id !== id);
                this.selectedItems.delete(id);
                this.cd.detectChanges();
            });
        });
    }

    edit(id: string): void {
        this.router.navigate([`./adverts/${id}/edit`]);
    }

    getAdverts(options: AdvertRequestOptions): void {
        this.advertService.getAdverts(options).subscribe(advertMeta => {
            this.listAdverts = advertMeta.data;
            this.totalAdverts = advertMeta.total_count;
            this.pageSize = advertMeta.limit;
            this.cd.detectChanges();
        });
    }

    search(value: string): void {
        this.pageIndex = 1;
        this.getAdverts({ search: value, page: this.pageIndex });
    }

    updateSelectedItems(id: string, checked: boolean): void {
        if (checked) {
            this.selectedItems.add(id);
        } else {
            this.selectedItems.delete(id);
        }
    }

    onAllChecked(value: boolean): void {
        this.listAdverts.forEach(item => this.updateSelectedItems(item.id, value));
    }

    changePage(event: number): void {
        if (event !== this.pageIndex) {
            this.getAdverts({ page: event });
        }
    }

    formatDate(date: string): string {
        return dayjs(date).format('DD-MM-YYYY HH:mm:ss');
    }

    getCategoryName(id: string): string {
        const categoryAdvert = this.categories.find(category => category.id === id);
        return categoryAdvert ? categoryAdvert.name : 'Категория не определена';
    }
}