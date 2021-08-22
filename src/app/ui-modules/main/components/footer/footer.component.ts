import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEntity } from '../../../../modules/static-pages/models/page.entity';

import { PageService } from '../../../../modules/static-pages/static.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
    pages: PageEntity[];

    constructor(private cd: ChangeDetectorRef, private staticService: PageService, private router: Router) {}

    ngOnInit(): void {
        this.staticService.getPages().subscribe(pages => {
            this.pages = pages;
            this.cd.detectChanges();
        });
    }

    navigateToMain(): void {
        this.router.navigate(['/']);
    }
}
