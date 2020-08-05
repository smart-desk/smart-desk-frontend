import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category, Model } from '../../../../shared/models/models.dto';

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
            this.category.name = this.form.get('name').value as string;
            this.category.model_id = (this.form.get('model').value as Model).id;
        } else {
            this.category = {
                name: this.form.get('name').value as string,
                model_id: (this.form.get('model').value as Model).id,
            } as Category;
        }

        this.save.emit(this.category);
    }

    onCancel(): void {
        this.cancel.emit();
    }

    private getModelByCategory(category: Category): Model {
        return !this.category ? this.models[0] : this.models.find(model => model.id === category.model_id);
    }
}
