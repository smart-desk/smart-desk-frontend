import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
    @Output() page = new EventEmitter<string>();
    @Input() totalAdverts: number;
    @Input() pageSize: number;
    pageIndex = 1;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.pageIndex = this.route.snapshot.queryParams.page;
    }

    pageChange(value) {
        this.page.emit(value);
    }
}
