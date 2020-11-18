import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AdvertService } from '../../../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Advert } from '../../../../shared/models/dto/advert.entity';

@Component({
    selector: 'app-advert',
    templateUrl: './advert.component.html',
    styleUrls: ['./advert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertComponent implements OnInit {
    advert$: Observable<Advert>;

    constructor(private advertService: AdvertService, private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.advert$ = this.route.paramMap.pipe(
            switchMap(params => {
                return this.advertService.getAdvert(params.get('advert_id'));
            })
        );
    }
}
