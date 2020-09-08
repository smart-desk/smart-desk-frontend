import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AdvertService } from '../../../../shared/services';
import { Advert } from '../../../../shared/models/models.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit {
    adverts: Advert[];
    isLoaded: boolean;

    constructor(private advertService: AdvertService, private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.isLoaded = false;
        this.route.paramMap
            .pipe(
                switchMap(params => {
                    return this.advertService.getAdverts(params.get('category_id'));
                })
            )
            .subscribe(data => {
                if (data) {
                    this.adverts = data;
                }

                this.isLoaded = true;
                this.cd.detectChanges();
            });
    }
}
