import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from '../../../../modules/model/models/model.entity';
import { ModelService } from '../../../../modules/model/model.service';

@Component({
    selector: 'app-models',
    templateUrl: './models.component.html',
    styleUrls: ['./models.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelsComponent {
    models: Model[] = [];

    constructor(private modelService: ModelService, private router: Router, private cd: ChangeDetectorRef) {
        this.updateModels();
    }

    updateModels(): void {
        this.modelService.getModels().subscribe(models => {
            this.models = models;
            this.cd.detectChanges();
        });
    }

    deleteModel(model: Model): void {
        this.modelService.deleteModel(model.id).subscribe(() => this.updateModels());
    }
}
