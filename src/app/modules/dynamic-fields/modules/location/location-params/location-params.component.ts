import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationParamsDto } from '../dto/location-params.dto';
import { Field } from '../../../../../models/field/field';

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
            title: [this.field.title || ''],
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
}
