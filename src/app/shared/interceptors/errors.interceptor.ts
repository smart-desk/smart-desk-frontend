import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
    constructor(private message: NzMessageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            retry(environment.retry),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 500) {
                    this.message.error(`${error.message}`);
                }
                return throwError(error);
            })
        );
    }
}
