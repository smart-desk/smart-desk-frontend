import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookmark } from './models/bookmark.entity';
import { HttpClient } from '@angular/common/http';
import { CreateBookmarkDto } from './models/create-bookmark.dto';

@Injectable()
export class BookmarksService {
    constructor(private http: HttpClient) {}

    getUserBookmarks(): Observable<Bookmark[]> {
        return this.http.get<Bookmark[]>(`/bookmarks`);
    }

    createBookmark(advertId: string): Observable<Bookmark> {
        return this.http.post<Bookmark>(`/bookmarks`, { productId: advertId } as CreateBookmarkDto);
    }

    deleteBookmark(bookmarkId: string): Observable<Bookmark> {
        return this.http.delete<Bookmark>(`/bookmarks/${bookmarkId}`);
    }
}
