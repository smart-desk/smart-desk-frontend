import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AdvertDataService } from '../../services';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AdvertDataService],
})
export class SearchComponent {
    @Input() searchPhrase: string;
    @Input() placeholder: string;
    @Output() newItemEvent = new EventEmitter<string>();

    constructor(private cd: ChangeDetectorRef) {}

    search() {
        this.newItemEvent.emit(this.searchPhrase);
        this.cd.detectChanges();
    }

    reset() {
        this.searchPhrase = '';
    }
}
