import { Injectable } from '@angular/core';
import { BookmarksService } from './bookmarks.service';
import { BehaviorSubject } from 'rxjs';
import { Bookmark } from './models/bookmark.entity';

@Injectable({
    providedIn: 'root',
})
export class BookmarksStoreService {
    bookmarks$ = new BehaviorSubject<Bookmark[]>([]);

    constructor(private bookmarksService: BookmarksService) {}

    loadBookmarks() {
        this.bookmarksService.getUserBookmarks().subscribe(bookmarks => {
            this.bookmarks$.next(bookmarks);
        });
    }

    deleteBookmark(productId: string) {
        const bookmarks = this.bookmarks$.getValue();
        if (!bookmarks) {
            return;
        }
        const removedBookmark = bookmarks.find(bookmark => bookmark.product.id === productId);
        if (!removedBookmark) {
            return;
        }
        this.bookmarksService.deleteBookmark(removedBookmark.id).subscribe(() => {
            const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== removedBookmark.id);
            this.bookmarks$.next(updatedBookmarks);
        });
    }

    createBookmark(productId: string) {
        this.bookmarksService.createBookmark(productId).subscribe(bookmark => {
            const bookmarks = this.bookmarks$.getValue();
            bookmarks.push(bookmark);
            this.bookmarks$.next(bookmarks);
        });
    }
}
