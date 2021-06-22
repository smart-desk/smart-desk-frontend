import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdCampaignService } from '../../../../modules/ad-campaign/ad-campaign.service';

@Component({
    selector: 'app-ad-setup',
    templateUrl: './ad-setup.component.html',
    styleUrls: ['./ad-setup.component.scss'],
})
export class AdSetupComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder, private readonly adCampaignService: AdCampaignService) {}

    submitForm(): void {
        this.adCampaignService.postAdSetup(this.form.value).subscribe();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            mainHourlyRate: [undefined],
            sidebarHourlyRate: [undefined],
        });
        this.adCampaignService
            .getAdSetup()
            .pipe()
            .subscribe(data => this.form.patchValue(data));
    }
}
