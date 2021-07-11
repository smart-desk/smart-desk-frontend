import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdCampaignEntity, AdCampaignType } from '../../modules/ad/models/ad-campaign.entity';
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
    @Output() changeFormEvent = new EventEmitter<Record<string, any>>(true);
    @Input() adData: AdCampaignEntity;
    form: FormGroup;
    isSelectType: boolean;
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
            timeRange: [this.adData ? [this.adData.endDate, this.adData.startDate] : undefined, Validators.required],
            link: [this.adData?.link, Validators.required],
            img: [this.adData?.img, Validators.required],
        });

        this.form
            .get('type')
            ?.valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(adType => {
                this.isSelectType = true;
                this.changeFormEvent.emit({ control: 'type', value: adType });
            });

        this.form
            .get('timeRange')
            ?.valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(([startDate, endDate]) => {
                this.changeFormEvent.emit({ control: 'timeRange', value: [startDate, endDate] });
            });
    }

    fileChanged(event: NzUploadChangeParam): void {
        if (event.type === 'success') {
            this.file = [event.file];
            const fileUrl = this.file[0].response.url;
            (this.form.get('img') as AbstractControl).setValue(fileUrl);
        }
    }

    saveCampaign(): AdCampaignEntity {
        const formValue = { id: this.adData.id, ...this.form.value };
        const campaignOptions = new AdCampaignEntity();
        campaignOptions.img = formValue.img;
        campaignOptions.link = formValue.link;
        campaignOptions.type = formValue.type;
        campaignOptions.startDate = dayjs(formValue.timeRange[0]).startOf('day').toDate();
        campaignOptions.endDate = dayjs(formValue.timeRange[1]).endOf('day').toDate();
        return campaignOptions;
    }
}
