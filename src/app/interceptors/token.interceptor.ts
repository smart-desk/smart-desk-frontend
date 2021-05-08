import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.getBearerToken();
        if (!token) {
            return next.handle(req);
        }

        const request = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        return next.handle(request);
    }

    private getBearerToken(): string {
        try {
            return localStorage.getItem('token') || '';
        } catch (e) {
            return '';
        }
    }
}
