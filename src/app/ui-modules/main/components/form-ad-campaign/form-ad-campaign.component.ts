import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdCampaignEntity, AdCampaignType } from '../../../../modules/ad/models/ad-campaign.entity';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-form-ad-campaign',
    templateUrl: './form-ad-campaign.component.html',
    styleUrls: ['./form-ad-campaign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAdCampaignComponent implements OnInit {
    @Input() adData: AdCampaignEntity;
    @Output() changeFormEvent = new EventEmitter<AdCampaignEntity>();
    form: FormGroup;
    isTypeSelected: boolean;
    adTypes = [
        { name: 'Главная', sysName: AdCampaignType.MAIN },
        { name: 'Сайдбар', sysName: AdCampaignType.SIDEBAR },
    ];
    file: NzUploadFile[] = [];
    private destroy$ = new Subject();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        if (this.adData) {
            this.file = [{ uid: '-1', name: 'ad-image.png', url: this.adData?.img }];
        }
        this.form = this.fb.group({
            type: [this.adData?.type, Validators.required],
            timeRange: [
                { value: this.adData ? [this.adData.endDate, this.adData.startDate] : undefined, disabled: !this.isTypeSelected },
                Validators.required,
            ],
            link: [this.adData?.link, Validators.required],
            img: [this.adData?.img, Validators.required],
        });

        this.form
            .get('type')
            ?.valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.isTypeSelected = true;
                const campaign = this.buildAdCampaign();
                this.changeFormEvent.emit(campaign);
            });

        this.form
            .get('timeRange')
            ?.valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                const campaign = this.buildAdCampaign();
                this.changeFormEvent.emit(campaign);
            });
    }

    fileChanged(event: NzUploadChangeParam): void {
        if (event.type === 'success') {
            this.file = [event.file];
            const fileUrl = this.file[0].response.url;
            (this.form.get('img') as AbstractControl).setValue(fileUrl);
        }
    }

    getAdCampaignData(): AdCampaignEntity {
        return this.buildAdCampaign();
    }

    private buildAdCampaign(): AdCampaignEntity {
        const campaignOptions = new AdCampaignEntity();
        campaignOptions.id = this.adData?.id;
        campaignOptions.img = this.form.get('img')?.value;
        campaignOptions.link = this.form.get('link')?.value;
        campaignOptions.type = this.form.get('type')?.value;
        campaignOptions.startDate = dayjs(this.form.get('timeRange')?.value?.[0]).startOf('day').toDate();
        campaignOptions.endDate = dayjs(this.form.get('timeRange')?.value?.[1]).endOf('day').toDate();

        return campaignOptions;
    }
}
