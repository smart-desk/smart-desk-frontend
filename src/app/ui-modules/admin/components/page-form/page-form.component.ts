import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { StaticService } from '../../../../modules/static-pages/static.service';
import { PageEntity } from '../../../../modules/static-pages/models/page.entity';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-site-page-form',
    templateUrl: './page-form.component.html',
    styleUrls: ['./page-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageFormComponent implements OnInit, OnDestroy {
    form: FormGroup;
    formTitle = 'Создать страницу на сайте';
    private destroy$ = new Subject();
    private pageId: string;

    constructor(
        private route: ActivatedRoute,
        private readonly staticPagesService: StaticService,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder,
        private router: Router,
        private notification: NzNotificationService
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                takeUntil(this.destroy$),
                switchMap(paramMap => {
                    this.pageId = paramMap.get('id') || '';
                    if (this.pageId) {
                        this.formTitle = 'Редактировани стринцу сайта';
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
            title: new FormControl(pageData?.title, [Validators.maxLength(255), Validators.required]),
            content: new FormControl(pageData?.content, [Validators.maxLength(10000), Validators.required]),
        }));
    }

    save(): void {
        if (!this.form.valid) {
            if (this.form.get('title')?.status === 'INVALID') {
                this.createNotification({
                    type: 'error',
                    title: 'Ошибка данных',
                    content: 'Заголовок, обяхательное поле, с ограниченной длинной в 255 символа',
                });
            }
            if (this.form.get('content')?.status === 'INVALID') {
                this.createNotification({
                    type: 'error',
                    title: 'Ошибка данных',
                    content: 'Содержание, обяхательное поле, с ограниченной длинной в 10000 символов',
                });
            }
            return;
        }

        const request = this.pageId
            ? this.staticPagesService.update(this.pageId, this.form.value)
            : this.staticPagesService.create(this.form.value);

        request.subscribe(() => {
            this.createNotification({
                type: 'success',
                title: 'Успех',
                content: 'Данные сохранены',
            });
            this.router.navigate([`/site-pages/${this.pageId}`]);
        });
    }

    private createNotification(data: { type: string; title: string; content: string }) {
        this.notification.create(data.type, data.title, data.content);
    }
}
