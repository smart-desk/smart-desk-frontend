import { Injectable } from '@angular/core';
import { BookmarksService } from './bookmarks.service';
import { BehaviorSubject } from 'rxjs';
import { Bookmark } from '../../models/dto/bookmarks/bookmark.entity';

@Injectable({
    providedIn: 'root',
})
export class BookmarksStoreService {
    bookmarks$ = new BehaviorSubject<Bookmark[]>(null);
    constructor(private bookmarksService: BookmarksService) {}

    loadBookmarks() {
        this.bookmarksService.getUserBookmarks().subscribe(bookmarks => {
            this.bookmarks$.next(bookmarks);
        });
    }
}
