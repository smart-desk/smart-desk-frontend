import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-ad-modal',
    templateUrl: './ad-modal.component.html',
    styleUrls: ['./ad-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdRejectReasonComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            reason: ['', Validators.required],
        });
    }
}
