import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from '../../../../shared/services';
import { LoginService } from '../../../../shared/services/login/login.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../../shared/models/dto/user/user.entity';
import { LocationFormComponent } from '../location-form/location-form.component';
import { AddressService } from '../../../../shared/services/address/address.service';
import { Address } from '../../../../shared/models/dto/address/address.entity';

@Component({
    selector: 'app-navigation-header',
    templateUrl: './navigation-header.component.html',
    styleUrls: ['./navigation-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationHeaderComponent implements OnInit, OnDestroy {
    user: User;
    destroy$ = new Subject();
    isAdmin: boolean;
    address: Address;

    constructor(
        private authService: AuthService,
        private loginService: LoginService,
        private cd: ChangeDetectorRef,
        private modalService: NzModalService,
        private addressService: AddressService
    ) {}

    ngOnInit() {
        this.loginService.login$.pipe(takeUntil(this.destroy$)).subscribe(user => {
            this.user = user;
            this.isAdmin = user?.roles.includes('admin');
            this.cd.detectChanges();
        });

        this.addressService.getProfileAddress().subscribe(address => {
            this.address = address;
            this.cd.detectChanges();
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openLocationModal(): void {
        const modalRef = this.modalService.create({
            nzTitle: 'Ваше местоположение',
            nzContent: LocationFormComponent,
            nzWidth: 848,
            nzFooter: null,
            nzComponentParams: { address: this.address },
        });

        modalRef.afterClose.subscribe((address: Address) => {
            if (address) {
                this.address = address;
                this.cd.detectChanges();
            }
        });
    }
}
