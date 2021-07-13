import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdService } from '../../../../modules/ad/ad.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
    selector: 'app-ad-setup',
    templateUrl: './ad-config.component.html',
    styleUrls: ['./ad-config.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdConfigComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private readonly adService: AdService,
        private readonly notificationService: NzNotificationService
    ) {}

    submitForm(): void {
        this.adService
            .updateAdConfig(this.form.value)
            .pipe(
                catchError(() => {
                    this.notificationService.error('Произошла ошибка', 'Попробуйте повторить позже');
                    return EMPTY;
                })
            )
            .subscribe(() => this.notificationService.success('Сохранено', 'Настройки успешно сохранены'));
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            mainHourlyRate: [],
            sidebarHourlyRate: [],
            liftRate: [],
        });
        this.adService.getAdConfig().subscribe(data => this.form.patchValue(data));
    }
}
