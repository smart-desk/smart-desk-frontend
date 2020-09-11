import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
    @Output() page = new EventEmitter<string>();
    @Input() totalAdverts: number;
    pageIndex = 1;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.pageIndex = this.route.snapshot.queryParams.page;
    }

    pageChange(value) {
        this.page.emit(value);
    }
}
