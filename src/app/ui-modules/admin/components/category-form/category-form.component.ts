import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../../../../modules/category/models/category.entity';
import { Model } from '../../../../modules/model/models/model.entity';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

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

    file: NzUploadFile[] = [];
    form: FormGroup;

    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.form = this.fb.group({
            name: [this.category?.name],
            model: [this.getModelByCategory(this.category)],
            image: this.category?.img,
        });

        const img = this.category?.img;
        this.file = [{ uid: '-1', name: 'image.png', url: img }];
        this.cd.detectChanges();
    }

    submit(): void {
        if (this.category) {
            this.category.name = this.form.get('name')?.value;
            // todo: что лежит в modelId
            this.category.modelId = this.form.get('model')?.value?.id;
            this.category.img = this.form.get('image')?.value;
        } else {
            this.category = new Category();
            this.category.name = this.form.get('name')?.value;
            this.category.modelId = this.form.get('model')?.value.id;
            this.category.img = this.form.get('image')?.value;
        }

        this.save.emit(this.category);
    }

    onCancel(): void {
        this.cancel.emit();
    }

    fileChanged(event: NzUploadChangeParam): void {
        if (event.type === 'success') {
            this.file = [event.file];
            const fileUrl = this.file[0].response.url;
            this.category.img = fileUrl;
            (this.form.get('img') as AbstractControl).setValue(fileUrl);
        }
    }

    private getModelByCategory(category: Category): Model {
        return !this.category ? this.models[0] : (this.models.find(model => model.id === category.modelId) as Model);
    }
}
