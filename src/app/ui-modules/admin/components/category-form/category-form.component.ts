import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Category } from '../../../../modules/category/models/category.entity';
import { Model } from '../../../../modules/model/models/model.entity';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent implements OnInit {
    @Input() category: Category;
    @Input() models: Model[] = [];

    @Output() save = new EventEmitter<Category>();
    @Output() cancel = new EventEmitter<void>();

    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            name: [(this.category && this.category.name) || ''],
            model: [this.getModelByCategory(this.category) || null],
        });
    }

    submit(): void {
        if (this.category) {
            this.category.name = this.form.get('name')?.value;
            // todo: что лежит в modelId
            this.category.modelId = this.form.get('model')?.value?.id;
        } else {
            this.category = new Category();
            this.category.name = this.form.get('name')?.value;
            this.category.modelId = this.form.get('model')?.value.id;
        }

        this.save.emit(this.category);
    }

    onCancel(): void {
        this.cancel.emit();
    }

    private getModelByCategory(category: Category): Model {
        return !this.category ? this.models[0] : (this.models.find(model => model.id === category.modelId) as Model);
    }
}
