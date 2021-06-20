import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AbstractFieldFormComponent } from '../../../../../dynamic-fields/models/abstract-field-form.component';
import { EMPTY, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Advert } from '../../../../../../modules/advert/models/advert.entity';
import { Model } from '../../../../../../modules/model/models/model.entity';
import { UpdateAdvertDto } from '../../../../../../modules/advert/models/advert.dto';
import { AdvertService } from '../../../../../../modules/advert/advert.service';
import { ModelService } from '../../../../../../modules/model/model.service';

@Component({
    selector: 'app-advert-edit',
    templateUrl: './advert-edit.component.html',
    styleUrls: ['./advert-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertEditComponent implements OnInit {
    form: FormGroup;
    advert: Advert;
    protected components: ComponentRef<AbstractFieldFormComponent<any, any>>[] = [];

    constructor(
        private advertService: AdvertService,
        private modelService: ModelService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap((paramMap: ParamMap) => {
                    const advertId = paramMap.get('advert_id');
                    if (advertId) {
                        return this.advertService.getAdvert(advertId);
                    }
                    return EMPTY;
                })
            )
            .subscribe(
                (advert: Advert): Observable<Model> => {
                    this.advert = advert;
                    this.cd.detectChanges();
                    return this.modelService.getModel(advert.model_id);
                }
            );
    }

    save(advert: UpdateAdvertDto): void {
        this.advertService.updateAdvert(this.advert.id, advert).subscribe(() => this.router.navigate(['adverts', this.advert.id]));
    }
}
