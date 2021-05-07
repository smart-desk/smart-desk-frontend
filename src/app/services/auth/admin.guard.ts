import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { UserService } from '../index';
import { RolesEnum } from '../../models/user/user-roles.enum';
import { User } from '../../models/user/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router, private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.getCurrentUser().pipe(
            map((user: User) => {
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
