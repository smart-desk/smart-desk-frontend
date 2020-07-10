import { Component } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelService } from '../../../../core/services/model/model.service';
import { switchMap, take } from 'rxjs/operators';
import { Model, Section } from '../../../../core/models/models.dto';
import { SectionService } from '../../../../core/services/section/section.service';

@Component({
    selector: 'app-create-model',
    templateUrl: './create-model.component.html',
    styleUrls: ['./create-model.component.scss'],
})
export class CreateModelComponent {
    public model: Model;
    public section: Section;

    public currentFieldType: string; // todo enum

    // todo вывести ошибки
    public modelForm = new FormGroup({
        name: new FormControl('', Validators.required),
    });

    // todo вывести ошибки
    public sectionForm = new FormGroup({
        fields: new FormArray([]),
    });

    constructor(private modelsService: ModelService, private sectionService: SectionService) {}

    public createModel() {
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
                this.section = section;
            });
    }

    public getSectionFieldsControls(): FormArray {
        return this.sectionForm.get('fields') as FormArray;
    }

    public addFieldToSectionForm() {
        // todo use this.currentTypeField
        const fields = this.sectionForm.get('fields') as FormArray;
        fields.push(new FormControl(''));
    }
}
