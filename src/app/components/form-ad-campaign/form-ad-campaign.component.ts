import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdCampaignEntity, AdCampaignType } from '../../modules/ad/models/ad-campaign.entity';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
    selector: 'app-form-ad-campaign',
    templateUrl: './form-ad-campaign.component.html',
    styleUrls: ['./form-ad-campaign.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAdCampaignComponent implements OnInit {
    @Output() changeFormEvent = new EventEmitter<Record<any, any>>(true);
    @Output() saveEvent = new EventEmitter<Record<any, any>>(true);
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
            type: [this.adData?.type || undefined, Validators.required],
            timeRange: [this.adData ? [this.adData.endDate, this.adData.startDate] : undefined, Validators.required],
            link: [this.adData?.link || undefined, Validators.required],
            img: [this.adData?.img || undefined, Validators.required],
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

    saveCampaign(): Record<any, any> {
        return { id: this.adData.id, ...this.form.value };
    }
}
