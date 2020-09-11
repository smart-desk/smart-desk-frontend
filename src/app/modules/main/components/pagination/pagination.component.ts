import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
    @Output() page = new EventEmitter<string>();
    @Input() totalPages: number;

    constructor() {}

    ngOnInit(): void {
        console.log('totalPages', this.totalPages);
    }

    pageChange(value) {
        this.page.emit(value);
    }
}
