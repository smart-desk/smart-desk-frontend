import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { StaticPagesService } from '../../../../modules/static-pages/static-pages.service';
import { PageEntity } from '../../../../modules/static-pages/models/page.entity';

@Component({
    selector: 'app-static-page',
    templateUrl: './site-page.component.html',
    styleUrls: ['./site-page.component.scss'],
})
export class SitePageComponent implements OnInit {
    page: PageEntity;

    constructor(private route: ActivatedRoute, private pagesService: StaticPagesService) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(switchMap(param => this.pagesService.getPage(param.get('id') || '')))
            .subscribe(page => (this.page = page));
    }
}
