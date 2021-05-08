import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldService } from '../../../../../services';
import { AbstractFieldParamsComponent } from '../../../models/abstract-field-params.component';
import { PhotoParamsDto } from '../dto/photo-params.dto';
import { Field } from '../../../../../models/field/field';

@Component({
    selector: 'app-photo-params',
    templateUrl: './photo-params.component.html',
    styleUrls: ['./photo-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoParamsComponent extends AbstractFieldParamsComponent<PhotoParamsDto> implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private fieldService: FieldService) {
        super();
    }

    ngOnInit(): void {
        const params = this.field.params;
        this.form = this.fb.group({
            max: [params?.max || 10, Validators.required],
            min: [params?.min || 1],
        });
    }

    getField(): Field<unknown, PhotoParamsDto> {
        this.field.params = {
            max: this.form.get('max').value,
            min: this.form.get('min').value
        };
        return this.field;
    }

    delete(): void {
        this.fieldService.deleteField(this.field.id).subscribe(() => {
            this.delete$.next(this);
        });
    }
}
