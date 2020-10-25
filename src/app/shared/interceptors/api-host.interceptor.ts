import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiHostInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiUrl = req.url.startsWith('/auth') || req.url.startsWith('/users') ? environment.nestApiUrl : environment.apiURL;

        const request = req.clone({
            url: `${apiUrl}${req.url}`,
        });

        return next.handle(request);
    }
}
