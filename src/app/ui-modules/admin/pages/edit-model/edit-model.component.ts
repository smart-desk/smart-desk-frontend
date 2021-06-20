import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ModelService } from '../../../../services';
import { PreviewComponent } from '../../components/preview/preview.component';
import { Model } from '../../../../services/model/models/model.entity';
import { EMPTY } from 'rxjs';

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
        private cd: ChangeDetectorRef
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
}
