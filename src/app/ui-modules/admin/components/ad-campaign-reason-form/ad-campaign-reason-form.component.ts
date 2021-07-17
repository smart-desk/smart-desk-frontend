import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-ad-campaign-reason-form',
    templateUrl: './ad-campaign-reason-form.component.html',
    styleUrls: ['./ad-campaign-reason-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdCampaignReasonFormComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            reason: ['', Validators.required],
        });
    }
}
