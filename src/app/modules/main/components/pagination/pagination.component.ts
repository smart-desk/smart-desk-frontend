import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
    @Output() page = new EventEmitter<string>();
    @Input() totalAdverts: number;

    constructor() {}

    ngOnInit(): void {}

    pageChange(value) {
        this.page.emit(value);
    }
}
