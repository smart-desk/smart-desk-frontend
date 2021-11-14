import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdService } from '../../../../modules/ad/ad.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { PromoService } from '../../../../modules/promo/promo.service';
import { PromoSet } from '../../../../modules/promo/models/promo-set.entity';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PromoSetFormComponent } from '../../components/promo-set-form/promo-set-form.component';
import { NzModalRef } from 'ng-zorro-antd/modal/modal-ref';
import { createGoogleAdsenseElement } from '../../../../utils';

@Component({
    selector: 'app-ad-setup',
    templateUrl: './ad-config.component.html',
    styleUrls: ['./ad-config.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdConfigComponent implements OnInit {
    form: FormGroup;
    promoSets: PromoSet[];

    constructor(
        private fb: FormBuilder,
        private readonly adService: AdService,
        private readonly notificationService: NzNotificationService,
        private readonly promoService: PromoService,
        private cd: ChangeDetectorRef,
        private modalService: NzModalService
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
        this.getPromoSets();

        this.form = this.fb.group({
            mainHourlyRate: [],
            sidebarHourlyRate: [],
            liftRate: [],
            adsense: [],
        });
        this.adService.getAdConfig().subscribe(data =>
            this.form.patchValue({
                ...data,
                adsense: data?.adsense ? createGoogleAdsenseElement(data.adsense).outerHTML : '',
            })
        );
    }

    getPromoSets(): void {
        this.promoService.getPromoSets().subscribe(res => {
            this.promoSets = res;
            this.cd.detectChanges();
        });
    }

    openPromoSetForm(promoSet?: PromoSet): void {
        const modalRef: NzModalRef = this.modalService.create<PromoSetFormComponent>({
            nzTitle: promoSet ? `Изменение пакета ${promoSet.name}` : 'Создание нового пакета',
            nzContent: PromoSetFormComponent,
            nzComponentParams: { promoSet },
            nzFooter: [
                {
                    label: 'Отмена',
                    onClick: () => modalRef.close(),
                },
                {
                    label: 'Сохранить',
                    type: 'primary',
                    onClick: (contentComponentInstance?: PromoSetFormComponent) => {
                        const promoSetBody = contentComponentInstance?.savePromoSet();
                        if (promoSetBody) {
                            this.savePromoSet(promoSetBody);
                            modalRef.close();
                        }
                    },
                },
            ],
        });
    }

    deletePromoSet(promoSet: PromoSet): void {
        this.promoService.deletePromoSet(promoSet.id).subscribe(() => this.getPromoSets());
    }

    private savePromoSet(promoSet: PromoSet): void {
        if (promoSet.id) {
            this.promoService.updatePromoSet(promoSet.id, promoSet).subscribe(() => this.getPromoSets());
        } else {
            this.promoService.createPromoSet(promoSet).subscribe(() => this.getPromoSets());
        }
    }
}
