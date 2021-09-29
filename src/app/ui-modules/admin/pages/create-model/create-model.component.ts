import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Model } from '../../../../modules/model/models/model.entity';
import { ModelService } from '../../../../modules/model/model.service';

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
        name: new FormControl('', Validators.required),
    });

    constructor(private modelsService: ModelService, private router: Router) {}

    createModel(): void {
        this.modelsService
            .createModel({
                name: this.modelForm.get('name')?.value,
            })
            .subscribe(model => {
                this.router.navigate(['admin', 'models', 'edit', model.id]);
            });
    }

    onBack(): void {
        this.router.navigate(['./admin/models']);
    }
}
