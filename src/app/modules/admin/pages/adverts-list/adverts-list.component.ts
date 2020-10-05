import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdvertService } from '../../../../shared/services';
import { Advert } from '../../../../shared/models/models.dto';
import { Router } from '@angular/router';

@Component({
    selector: 'app-table-adverts',
    templateUrl: './adverts-list.component.html',
    styleUrls: ['./adverts-list.component.scss'],
})
export class AdvertsListComponent implements OnInit {
    @ViewChild('dialogWindow') dialogWindow: ElementRef;
    searchValue = '';
    visible = false;
    listAdverts: Advert[];
    listDisplayAdverts: Advert[];
    checked = false;
    indeterminate = false;
    selectedItems = new Set<string>();
    pageIndex = 1;
    pageSize = 20;
    totalAdverts: number;

    constructor(private advertService: AdvertService, private router: Router) {}

    ngOnInit(): void {
        this.getAdverts(this.pageIndex);
    }

    delete(value?) {
        this.advertService.deleteAdvert(value).subscribe();
        this.listAdverts = this.listAdverts.filter(item => item.id !== value);
        this.listDisplayAdverts = [...this.listAdverts];
    }

    confirm(): void {
        this.selectedItems.forEach(id => {
            this.updateSelectedItems(id, false);
            this.advertService.deleteAdvert(id).subscribe();
        });
        this.listAdverts = this.listAdverts.filter(item => !this.selectedItems.has(item.id));
        this.listDisplayAdverts = [...this.listAdverts];
    }

    cancel(): void {}

    edit(id: string) {
        this.router.navigate([`./adverts/${id}/edit`]);
    }

    getAdverts(pageIndex) {
        this.advertService.getAdverts({ page: pageIndex }).subscribe(advertMeta => {
            this.listAdverts = advertMeta.data;
            this.listDisplayAdverts = [...this.listAdverts];
            this.totalAdverts = advertMeta.total_count;
            this.pageSize = advertMeta.limit;
        });
    }

    reset(): void {
        this.searchValue = '';
        this.search();
    }

    search(): void {
        this.visible = false;
        this.listDisplayAdverts = this.listAdverts.filter(item => item.id.indexOf(this.searchValue) !== -1);
    }

    updateSelectedItems(id: string, checked: boolean): void {
        if (checked) {
            this.selectedItems.add(id);
        } else {
            this.selectedItems.delete(id);
        }
    }

    onItemChecked(id: string, checked: boolean): void {
        this.updateSelectedItems(id, checked);
    }

    onAllChecked(value: boolean): void {
        this.listDisplayAdverts.forEach(item => this.updateSelectedItems(item.id, value));
    }

    changePage(event) {
        this.getAdverts(event);
    }
}
