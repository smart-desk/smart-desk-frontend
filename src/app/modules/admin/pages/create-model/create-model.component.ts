import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Model } from '../../../../shared/models/models.dto';
import { ModelService, SectionService } from '../../../../shared/services';

@Component({
    selector: 'app-create-model',
    templateUrl: './create-model.component.html',
    styleUrls: ['./create-model.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateModelComponent {
    model: Model;

    // todo вывести ошибки сервера
    modelForm = new FormGroup({
        name: new FormControl((this.model && this.model.name) || '', Validators.required),
    });

    constructor(private modelsService: ModelService, private sectionService: SectionService, private router: Router) {}

    createModel(): void {
        this.modelsService
            .createModel({
                name: this.modelForm.get('name').value,
            })
            .pipe(
                switchMap(model => {
                    this.model = model;
                    return this.sectionService.createSection({
                        type: 'params',
                        model_id: this.model.id,
                    });
                })
            )
            .subscribe(() => {
                this.router.navigate(['admin', 'models', 'edit', this.model.id]);
            });
    }

    onBack(): void {
        this.router.navigate(['./admin/models']);
    }
}
