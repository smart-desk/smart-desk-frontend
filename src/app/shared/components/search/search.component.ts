import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
    @Input() searchPhrase: string;
    @Input() placeholder: string;
    @Output() searchChange = new EventEmitter<string>();

    constructor(private cd: ChangeDetectorRef) {}

    search(): void {
        this.searchChange.emit(this.searchPhrase);
        this.cd.detectChanges();
    }

    reset(): void {
        this.searchPhrase = '';
        this.searchChange.emit(this.searchPhrase);
        this.cd.detectChanges();
    }
}
