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
    public models$: Observable<Model[]>;

    constructor(private modelService: ModelService, private router: Router) {
        this.models$ = this.modelService.getModels();
    }

    public createModel(): void {
        this.router.navigate(['admin/models/create']);
    }

    public editModel(model: Model): void {
        // todo do not ignore navigate promise
        this.router.navigate(['admin/models/edit', model.id]);
    }

    public deleteModel(model: Model): void {
        console.log(model);
    }
}
