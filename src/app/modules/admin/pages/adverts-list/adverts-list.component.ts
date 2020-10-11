import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdvertService, CategoryService } from '../../../../shared/services';
import { Advert } from '../../../../shared/models/models.dto';
import { Router } from '@angular/router';

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

    constructor(
        private advertService: AdvertService,
        private router: Router,
        private categoryService: CategoryService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.getAdverts(this.pageIndex);
    }

    delete(id?: string) {
        this.advertService.deleteAdvert(id).subscribe();
        this.listAdverts = this.listAdverts.filter(item => item.id !== id);
        this.cd.detectChanges();
    }

    deleteSelectedAdverts(): void {
        this.selectedItems.forEach(id => {
            this.updateSelectedItems(id, false);
            this.advertService.deleteAdvert(id).subscribe();
        });
        this.listAdverts = this.listAdverts.filter(item => !this.selectedItems.has(item.id));
        this.cd.detectChanges();
    }

    edit(id: string) {
        this.router.navigate([`./adverts/${id}/edit`]);
    }

    getAdverts(pageIndex: number) {
        this.advertService.getAdverts({ page: pageIndex }).subscribe(advertMeta => {
            this.listAdverts = advertMeta.data;
            this.totalAdverts = advertMeta.total_count;
            this.pageSize = advertMeta.limit;
        });
        this.cd.detectChanges();
    }

    search(value: string): void {
        this.advertService.getAdverts({ search: value }).subscribe(advertMeta => {
            this.listAdverts = advertMeta.data;
            this.totalAdverts = advertMeta.total_count;
            this.pageSize = advertMeta.limit;
        });
        this.cd.detectChanges();
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

    changePage(event: number) {
        this.getAdverts(event);
    }

    formatDate(datestring) {
        const date = new Date(datestring);
        const dd = date.getDate();
        let ddStr = String(dd);
        if (dd < 10) {
            ddStr = '0' + ddStr;
        }

        const mm = date.getMonth() + 1;
        let mmStr = String(mm);
        if (mm < 10) {
            mmStr = '0' + mmStr;
        }

        const yy = date.getFullYear();
        let yyStr = String(yy);
        if (yy < 10) {
            yyStr = '0' + yyStr;
        }

        const hh = date.getHours();
        let hhStr = String(hh);
        if (hh < 10) {
            hhStr = '0' + hhStr;
        }

        const min = date.getMinutes();
        let minStr = String(min);
        if (min < 10) {
            minStr = '0' + minStr;
        }

        const ss = date.getSeconds();
        let ssStr = String(ss);
        if (ss < 10) {
            ssStr = '0' + ssStr;
        }

        return `${ddStr}.${mmStr}.${yyStr} ${hhStr}:${minStr}:${ssStr}`;
    }

    getCategoryName(id) {
        this.categoryService.getCategory(id).subscribe(category => category.name);
    }
}
