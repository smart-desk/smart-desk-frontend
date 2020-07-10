import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelService } from '../../../../core/services/model/model.service';
import { Model } from '../../../../core/models/models.dto';
import { Router } from '@angular/router';

@Component({
    selector: 'app-models',
    templateUrl: './models.component.html',
    styleUrls: ['./models.component.scss'],
})
export class ModelsComponent {
    public models: Model[] = [];

    constructor(private modelService: ModelService, private router: Router) {
        this.updateModels();
    }

    public updateModels(): void {
        this.modelService.getModels().subscribe(models => {
            this.models = models;
        });
    }

    public createModel(): void {
        this.router.navigate(['admin/models/create']);
    }

    public deleteModel(model: Model): void {
        this.modelService.deleteModel(model.id).subscribe(() => this.updateModels());
    }
}
