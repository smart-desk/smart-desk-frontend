import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-product-block-reason-form',
    templateUrl: './product-block-reason-form.component.html',
    styleUrls: ['./product-block-reason-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBlockReasonFormComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            reason: ['', Validators.required],
        });
    }
}
