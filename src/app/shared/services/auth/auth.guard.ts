import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { UserService } from '..';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router, private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.getCurrentUser().pipe(
            // TODO: сделать компонент, для редиректа.
            tap(user => !user && this.router.navigate([''])),
            map(user => !!user)
        );
    }
}
