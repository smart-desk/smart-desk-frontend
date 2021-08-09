import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StaticPagesService } from '../../../../modules/static-pages/static-pages.service';

@Component({
    selector: 'app-static-page',
    templateUrl: './static-page-form.component.html',
    styleUrls: ['./static-page-form.component.scss'],
})
export class StaticPageFormComponent implements OnInit {
    // private destroy$ = new Subject();
    // private editId: string;

    constructor(private route: ActivatedRoute, private readonly staticPagesService: StaticPagesService) {}

    ngOnInit(): void {
        this.route.paramMap.pipe(
            switchMap(paramMap => {
                const editId = paramMap.get('id') || '';
                if (editId) {
                    return this.staticPagesService.getPage(editId);
                }
                return EMPTY;
            })
        );
    }
}
