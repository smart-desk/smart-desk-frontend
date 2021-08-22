import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PageService } from '../../../../modules/static-pages/static.service';

@Component({
    selector: 'app-static-page',
    templateUrl: './site-page.component.html',
    styleUrls: ['./site-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SitePageComponent implements OnInit {
    title: string;
    content: string;

    constructor(private route: ActivatedRoute, private pagesService: PageService, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.route.paramMap.pipe(switchMap(param => this.pagesService.getPage(param.get('id') || ''))).subscribe(page => {
            this.title = page.title;
            this.content = page.content;
            this.cd.detectChanges();
        });
    }
}
