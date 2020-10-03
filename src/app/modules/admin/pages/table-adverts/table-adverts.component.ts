import { Component, OnInit } from '@angular/core';
import { AdvertService } from '../../../../shared/services';
import { Advert } from '../../../../shared/models/models.dto';

@Component({
    selector: 'app-table-adverts',
    templateUrl: './table-adverts.component.html',
    styleUrls: ['./table-adverts.component.scss'],
})
export class TableAdvertsComponent implements OnInit {
    searchValue = '';
    visible = false;
    listAdverts: Advert[];
    listDisplayAdverts: Advert[];
    listOfSelection = [
        {
            text: 'Delete',
            onSelect: data => {
                this.delete();
            },
        },
    ];
    checked = false;
    indeterminate = false;
    setCheckedId = new Set<string>();
    constructor(private advertService: AdvertService) {}

    ngOnInit(): void {
        this.getAdverts();
    }

    /** Удаление checked объявлений */
    delete() {
        this.listDisplayAdverts.forEach(item => {
            if (this.setCheckedId.has(item.id)) {
                this.advertService.deleteAdvert(item.id);
            }
        });
        this.getAdverts();
    }

    getAdverts() {
        this.advertService.getAdverts({}).subscribe(items => {
            this.listAdverts = items.data;
            this.listDisplayAdverts = [...this.listAdverts];
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

    updateCheckedSet(id: string, checked: boolean): void {
        if (checked) {
            this.setCheckedId.add(id);
        } else {
            this.setCheckedId.delete(id);
        }
    }

    onItemChecked(id: string, checked: boolean): void {
        this.updateCheckedSet(id, checked);
    }

    onAllChecked(value: boolean): void {
        this.listDisplayAdverts.forEach(item => this.updateCheckedSet(item.id, value));
    }
}
