import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

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
    @Input() pageIndex: number;

    ngOnInit(): void {}

    pageChange(value) {
        this.page.emit(value);
    }
}
