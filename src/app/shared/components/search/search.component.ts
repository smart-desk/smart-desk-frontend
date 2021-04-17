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
    @Input() globalSearch: boolean;
    @Output() searchChange = new EventEmitter<{ searchPhrase: string; globalSearch: boolean }>();

    constructor(private cd: ChangeDetectorRef) {}

    search(): void {
        this.searchChange.emit({ searchPhrase: this.searchPhrase, globalSearch: this.globalSearch });
        this.cd.detectChanges();
    }

    reset(): void {
        this.searchPhrase = '';
        this.searchChange.emit({ searchPhrase: this.searchPhrase, globalSearch: this.globalSearch });
        this.cd.detectChanges();
    }
}
