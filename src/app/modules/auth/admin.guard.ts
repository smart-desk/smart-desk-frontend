import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { RolesEnum } from '../user/models/user-roles.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router, private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.getCurrentUser().pipe(
            map(user => {
                if (!user || !user.roles.includes(RolesEnum.ADMIN)) {
                    this.router.navigate(['forbidden']);
                    return false;
                }
                return true;
            }),
            catchError(() => {
                this.router.navigate(['forbidden']);
                return of(false);
            })
        );
    }
}
