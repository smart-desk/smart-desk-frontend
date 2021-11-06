import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdCampaignEntity, AdCampaignType, SHORT_DATE_FORMAT } from '../../../../modules/ad/models/ad-campaign.entity';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import { AdCampaignsScheduleDto } from '../../../../modules/ad/models/ad-campaigns-schedule.dto';
import { environment } from '../../../../../environments/environment';

dayjs.extend(customParseFormat);

@Component({
    selector: 'app-form-ad-campaign',
    templateUrl: './form-ad-campaign.component.html',
    styleUrls: ['./form-ad-campaign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAdCampaignComponent implements OnInit, OnChanges {
    @Input() adData: AdCampaignEntity;
    @Input() campaignSchedule: AdCampaignsScheduleDto = [];
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
        this.form = this.fb.group({
            title: [],
            type: [undefined, Validators.required],
            timeRange: [[], Validators.required],
            link: ['', Validators.required],
            img: ['', Validators.required],
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

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.adData && this.form) {
            const value: AdCampaignEntity = changes.adData?.currentValue;
            this.form.patchValue(changes.adData?.currentValue);
            this.form
                .get('timeRange')
                ?.setValue([dayjs(value.startDate, SHORT_DATE_FORMAT).toDate(), dayjs(value.endDate, SHORT_DATE_FORMAT).toDate()]);
            this.file = [{ uid: '-1', name: 'ad-image.png', url: environment.s3path + this.adData?.img }];
        }
    }

    fileChanged(event: NzUploadChangeParam): void {
        if (event.type === 'success') {
            this.file = [event.file];
            const fileUrl = this.file[0].response.key;
            (this.form.get('img') as AbstractControl).setValue(fileUrl);
        }
    }

    getAdCampaignData(): AdCampaignEntity {
        return this.buildAdCampaign();
    }

    disabledDate = (current: Date): boolean => {
        return this.campaignSchedule.some(range => {
            const currentDate = dayjs(current);
            const startDate = dayjs(range.startDate, SHORT_DATE_FORMAT);
            const endDate = dayjs(range.endDate, SHORT_DATE_FORMAT);
            return currentDate >= startDate && endDate >= currentDate;
        });
        // tslint:disable-next-line
    };

    private buildAdCampaign(): AdCampaignEntity {
        const campaignOptions = new AdCampaignEntity();
        campaignOptions.id = this.adData?.id;
        campaignOptions.img = this.form.get('img')?.value;
        campaignOptions.title = this.form.get('title')?.value;
        campaignOptions.link = this.form.get('link')?.value;
        campaignOptions.type = this.form.get('type')?.value;
        campaignOptions.startDate = dayjs(this.form.get('timeRange')?.value?.[0]).format(SHORT_DATE_FORMAT);
        campaignOptions.endDate = dayjs(this.form.get('timeRange')?.value?.[1]).format(SHORT_DATE_FORMAT);

        return campaignOptions;
    }
}
