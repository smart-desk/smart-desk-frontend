import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { PreviewComponent } from '../../components/preview/preview.component';
import { Model } from '../../../../modules/model/models/model.entity';
import { EMPTY } from 'rxjs';
import { ModelService } from '../../../../modules/model/model.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-edit-model',
    templateUrl: './edit-model.component.html',
    styleUrls: ['./edit-model.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditModelComponent implements OnInit {
    model: Model;

    @ViewChild(PreviewComponent)
    private preview: PreviewComponent;

    constructor(
        private modelsService: ModelService,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private notificationService: NzNotificationService
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    const modelId = params.get('id');
                    if (modelId) {
                        return this.modelsService.getModel(params.get('id') || '');
                    }
                    return EMPTY;
                })
            )
            .subscribe(model => {
                this.model = model;
                this.cd.detectChanges();
            });
    }

    editModelName(name: string) {
        this.model.name = name;
        this.modelsService
            .updateModel(this.model.id, { name })
            .pipe(
                catchError(err => {
                    this.notificationService.error('Обновление модели', 'Не удалось изменить название модели');
                    return EMPTY;
                })
            )
            .subscribe();
    }
}
