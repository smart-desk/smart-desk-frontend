import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ModelService } from '../../../../shared/services';
import { PreviewComponent } from '../../components/preview/preview.component';
import { Model } from '../../../../shared/models/dto/model.entity';

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
        this.route.paramMap.pipe(switchMap(params => this.modelsService.getModel(params.get('id')))).subscribe(model => {
            this.model = model;
            this.cd.detectChanges();
        });
    }
}
