import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// @TODO: Error handler template
@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            retry(2),
            catchError((error: HttpErrorResponse) => {
                // @TODO: Here goes Errors handler Modules
                console.warn(`[ERROR DEBUG] ${error}`);
                return throwError(error);
            })
        );
    }
}
