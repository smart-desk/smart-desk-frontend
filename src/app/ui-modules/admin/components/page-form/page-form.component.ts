import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { StaticPagesService } from '../../../../modules/static-pages/static-pages.service';
import { PageEntity } from '../../../../modules/static-pages/models/page.entity';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-static-page',
    templateUrl: './page-form.component.html',
    styleUrls: ['./page-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageFormComponent implements OnInit, OnDestroy {
    form: FormGroup;
    formTitle = 'Форма создания статической стринцы';
    private destroy$ = new Subject();
    private pageId: string;

    constructor(
        private route: ActivatedRoute,
        private readonly staticPagesService: StaticPagesService,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                takeUntil(this.destroy$),
                switchMap(paramMap => {
                    this.pageId = paramMap.get('id') || '';
                    if (this.pageId) {
                        this.formTitle = 'Форма редактировани статической стринцы';
                        return this.staticPagesService.getPage(this.pageId);
                    }
                    return of(undefined);
                })
            )
            .subscribe((page: PageEntity | undefined) => {
                this.createForm(page);
                this.cd.detectChanges();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    createForm(pageData: PageEntity | undefined): FormGroup {
        return (this.form = this.fb.group({
            title: new FormControl(pageData?.title),
            content: new FormControl(pageData?.content),
        }));
    }

    save(): void {
        if (this.pageId) {
            this.staticPagesService.update(this.pageId, this.form.value).subscribe();
        }
        const request = this.pageId
            ? this.staticPagesService.update(this.pageId, this.form.value)
            : this.staticPagesService.create(this.form.value);

        request.subscribe(() => this.router.navigate(['/admin/site-pages']));
    }
}
