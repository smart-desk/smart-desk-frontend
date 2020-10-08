import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AdvertDataService } from '../../services';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [AdvertDataService],
})
export class SearchComponent implements OnInit {
    @Input() searchPhrase;
    @Input() placeholder;
    @Output() newItemEvent = new EventEmitter<string>();
    constructor() {}

    ngOnInit(): void {}

    search() {
        this.newItemEvent.emit(this.searchPhrase);
    }

    reset() {
        this.searchPhrase = '';
    }
}
