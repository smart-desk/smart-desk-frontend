import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
    @Output() changePage = new EventEmitter<number>();
    @Input() totalItems: number;
    @Input() pageSize: number;
    @Input() pageIndex: number;
}
