import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StaticPagesService } from '../../../../modules/static-pages/static-pages.service';
import { PageEntity } from '../../../../modules/static-pages/models/page.entity';
import { Router } from '@angular/router';

@Component({
    selector: 'app-static-pages',
    templateUrl: './site-pages.component.html',
    styleUrls: ['./site-pages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SitePagesComponent implements OnInit {
    pages: PageEntity[];
    constructor(private pagesService: StaticPagesService, private cd: ChangeDetectorRef, private router: Router) {}

    ngOnInit(): void {
        this.pagesService.getPages().subscribe(pages => {
            this.pages = pages;
            this.cd.detectChanges();
        });
    }

    createPage(): void {
        this.router.navigate(['/admin/site-pages/create']);
    }

    editPage(id: string): void {
        this.router.navigate([`/admin/static-pages/edit/${id}`]);
    }
}
