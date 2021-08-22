import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageService } from '../../../../modules/static-pages/static.service';
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
    private pageRoute = '/admin/site-pages';
    constructor(private pagesService: PageService, private cd: ChangeDetectorRef, private router: Router) {}

    ngOnInit(): void {
        this.pagesService.getPages().subscribe(pages => {
            this.pages = pages;
            this.cd.detectChanges();
        });
    }

    createPage(): void {
        this.router.navigate([`${this.pageRoute}/create`]);
    }

    editPage(id: string): void {
        this.router.navigate([`${this.pageRoute}/edit/${id}`]);
    }
}
