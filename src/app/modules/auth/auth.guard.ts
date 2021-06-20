import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router, private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.getCurrentUser().pipe(
            map(user => {
                if (!user) {
                    this.router.navigate(['unauthorized']);
                    return false;
                }
                return true;
            }),
            catchError(() => {
                this.router.navigate(['unauthorized']);
                return of(false);
            })
        );
    }
}
