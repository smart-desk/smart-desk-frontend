import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdService } from '../../../../../../modules/ad/ad.service';
import { AdConfigEntity } from '../../../../../../modules/ad/models/ad-config.entity';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AdCampaignType } from '../../../../../../modules/ad/models/ad-campaign.entity';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { AdCampaignDto } from '../../../../../../modules/ad/models/ad-campaign.dto';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-create-ad-campaign',
    templateUrl: './create-ad-campaign.component.html',
    styleUrls: ['./create-ad-campaign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAdCampaignComponent implements OnInit, OnDestroy {
    date = null;
    form: FormGroup;
    totalSum = 0;
    adTypes = [
        { name: 'Главная', sysName: AdCampaignType.MAIN },
        { name: 'Сайдбар', sysName: AdCampaignType.SIDEBAR },
    ];
    selectedRate: number;
    file: NzUploadFile[] = [];
    private rate: AdConfigEntity;
    private destroy$ = new Subject();
    constructor(private fb: FormBuilder, private adService: AdService) {}

    ngOnInit(): void {
        this.adService.getAdConfig().subscribe(rateValue => (this.rate = rateValue));
        this.form = this.fb.group({
            type: [undefined, Validators.required],
            timeRange: [undefined, Validators.required],
            link: [undefined, Validators.required],
            img: [undefined, Validators.required],
        });

        this.form
            .get('type')
            ?.valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(rateData => {
                rateData === AdCampaignType.MAIN
                    ? (this.selectedRate = this.rate.mainHourlyRate)
                    : (this.selectedRate = this.rate.sidebarHourlyRate);
            });

        this.form
            .get('timeRange')
            ?.valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(([startDate, endDate]) => (this.totalSum = dayjs(endDate).diff(dayjs(startDate), 'hour') * this.selectedRate));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    fileChanged(event: NzUploadChangeParam): void {
        if (event.type === 'success') {
            this.file = [event.file];
            const fileUrl = this.file[0].response.url;
            (this.form.get('img') as AbstractControl).setValue(fileUrl);
        }
    }

    createCampaign(): void {
        const campaignOptions = new AdCampaignDto();
        campaignOptions.img = this.form.get('img')?.value;
        campaignOptions.link = this.form.get('link')?.value;
        campaignOptions.type = this.form.get('type')?.value;
        campaignOptions.startDate = dayjs(this.form.get('timeRange')?.value[0]).startOf('day').toDate();
        campaignOptions.endDate = dayjs(this.form.get('timeRange')?.value[1]).endOf('day').toDate();

        this.adService.createAdCampaign(campaignOptions).subscribe();
    }
}
