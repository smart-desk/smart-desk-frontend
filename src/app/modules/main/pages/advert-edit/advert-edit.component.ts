import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AdvertService } from '../../../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Advert } from '../../../../shared/models/models.dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-advert-edit',
    templateUrl: './advert-edit.component.html',
    styleUrls: ['./advert-edit.component.scss'],
})
export class AdvertEditComponent implements OnInit {
    form: FormGroup;
    validateForm!: FormGroup;
    advert$: Observable<Advert>;

    constructor(private advertService: AdvertService, private route: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.advert$ = this.route.paramMap.pipe(
            switchMap(params => {
                return this.advertService.getAdvert(params.get('advert_id'));
            })
        );
        this.advert$.subscribe(advert => this.createForm(advert));

        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
            nickname: [null],
            required: [false],
        });
    }

    createForm(advert) {
        this.form = new FormGroup({
            id: new FormControl(advert?.id),
            title: new FormControl(advert?.title),
            categoryId: new FormControl(advert?.category_id),
            modelId: new FormControl(advert?.model_id),
            createdAt: new FormControl(advert?.created_at),
            updatedAt: new FormControl(advert?.updated_at),
        });
    }

    submitForm(): void {
        // tslint:disable-next-line:forin
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }
}
