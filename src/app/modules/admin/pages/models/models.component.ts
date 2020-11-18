import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModelService } from '../../../../shared/services';
import { Model } from '../../../../shared/models/dto/model.entity';

@Component({
    selector: 'app-models',
    templateUrl: './models.component.html',
    styleUrls: ['./models.component.scss'],
})
export class ModelsComponent {
    models: Model[] = [];

    constructor(private modelService: ModelService, private router: Router) {
        this.updateModels();
    }

    updateModels(): void {
        this.modelService.getModels().subscribe(models => {
            this.models = models;
        });
    }

    createModel(): void {
        this.router.navigate(['admin/models/create']);
    }

    deleteModel(model: Model): void {
        this.modelService.deleteModel(model.id).subscribe(() => this.updateModels());
    }
}
