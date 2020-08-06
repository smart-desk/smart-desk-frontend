import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from '../../../../shared/models/models.dto';
import { ModelService } from '../../../../shared/services';

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
