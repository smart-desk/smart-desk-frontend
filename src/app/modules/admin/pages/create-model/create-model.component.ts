import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ModelService } from '../../../../core/services/model/model.service';
import { Model } from '../../../../core/models/models.dto';
import { SectionService } from '../../../../core/services/section/section.service';

@Component({
    selector: 'app-create-model',
    templateUrl: './create-model.component.html',
    styleUrls: ['./create-model.component.scss'],
})
export class CreateModelComponent {
    public model: Model;

    // todo вывести ошибки сервера
    public modelForm = new FormGroup({
        name: new FormControl((this.model && this.model.name) || '', Validators.required),
    });

    constructor(private modelsService: ModelService, private sectionService: SectionService, private router: Router) {}

    public createModel(): void {
        this.modelsService
            .createModel({
                name: this.modelForm.get('name').value,
            })
            .pipe(
                switchMap(model => {
                    this.model = model;
                    return this.sectionService.createSection({
                        model_id: this.model.id,
                    });
                })
            )
            .subscribe(section => {
                this.router.navigate(['admin', 'models', 'edit', this.model.id]);
            });
    }

    public onBack(): void {
        this.router.navigate(['./admin/models']);
    }
}
