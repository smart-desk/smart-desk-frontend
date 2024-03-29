import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationParamsDto } from '../dto/location-params.dto';
import { Field } from '../../../../../modules/field/models/field';

@Component({
    selector: 'app-location-params',
    templateUrl: './location-params.component.html',
    styleUrls: ['./location-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationParamsComponent extends AbstractFieldParamsComponent<LocationParamsDto> implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.form = this.fb.group({
            title: [this.field.title || '', [Validators.required, Validators.maxLength(255)]],
            required: [this.field.required || false],
            filterable: [this.field.filterable || false],
        });
    }

    getField(): Field<unknown, LocationParamsDto> {
        this.field.title = this.form.get('title')?.value;
        this.field.required = this.form.get('required')?.value;
        this.field.filterable = this.form.get('filterable')?.value;

        return this.field;
    }

    isValid(): boolean {
        return this.form.valid;
    }
}
