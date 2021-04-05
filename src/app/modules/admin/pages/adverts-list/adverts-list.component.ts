import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { zip } from 'rxjs';
import { AdvertService, CategoryService } from '../../../../shared/services';
import { Category } from '../../../../shared/models/category/category.entity';
import { GetAdvertsDto, GetAdvertsResponseDto } from '../../../../shared/models/advert/advert.dto';

@Component({
    selector: 'app-table-adverts',
    templateUrl: './adverts-list.component.html',
    styleUrls: ['./adverts-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertsListComponent implements OnInit {
    advertResponse: GetAdvertsResponseDto;
    selectedItems = new Set<string>();
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

    bulkAction(action: 'delete' | 'block'): void {
        let requests = [];
        switch (action) {
            case 'delete':
                requests = [...this.selectedItems.values()].map(id => this.advertService.deleteAdvert(id));
                break;
            case 'block':
                requests = [...this.selectedItems.values()].map(id => this.advertService.blockAdvert(id));
                break;
        }

        zip(...requests).subscribe(() => {
            this.selectedItems.clear();
            this.cd.detectChanges();
            this.getAdverts();
        });
    }

    edit(id: string): void {
        this.router.navigate([`/adverts/${id}/edit`]);
    }

    delete(id: string): void {
        this.advertService.deleteAdvert(id).subscribe(() => {
            this.advertResponse.adverts = this.advertResponse.adverts.filter(item => item.id !== id);
            this.cd.detectChanges();
        });
    }

    block(id: string): void {
        this.advertService.blockAdvert(id).subscribe(() => {
            this.advertResponse.adverts = this.advertResponse.adverts.filter(item => item.id !== id);
            this.cd.detectChanges();
        });
    }

    updateSelectedItems(id: string, checked: boolean): void {
        if (checked) {
            this.selectedItems.add(id);
        } else {
            this.selectedItems.delete(id);
        }
    }

    changePage(page: number): void {
        if (page !== this.advertResponse.page) {
            const options = new GetAdvertsDto();
            options.page = page;
            this.getAdverts(options);
        }
    }

    // todo make it as a pipe
    formatDate(date: Date | string): string {
        return dayjs(date).format('DD MMM YYYY HH:mm');
    }

    getCategoryName(id: string): string {
        const categoryAdvert = this.categories.find(category => category.id === id);
        return categoryAdvert ? categoryAdvert.name : 'Категория не определена';
    }

    private getAdverts(options?: GetAdvertsDto): void {
        this.advertService.getAdverts(options).subscribe(res => {
            this.advertResponse = res;
            this.cd.detectChanges();
        });
    }
}
