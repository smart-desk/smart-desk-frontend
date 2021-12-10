import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../modules/category/models/category.entity';
import { Model } from '../../../../modules/model/models/model.entity';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from '../../../../../environments/environment';

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
    sizeLimit = 10000;
    bitInMb = 1024;

    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private notificationService: NzNotificationService) {}

    ngOnInit() {
        this.form = this.fb.group({
            name: [this.category?.name, [Validators.required]],
            model: [this.getModelByCategory(this.category), [Validators.required]],
            image: [this.category?.img, [Validators.required]],
        });

        const img = this.category?.img;
        if (img) {
            this.file = [{ uid: '-1', name: 'image.png', url: environment.s3path + img }];
        }
        this.cd.detectChanges();
    }

    submit(): void {
        if (!this.form.valid) {
            this.notificationService.error('Ошибка формы', 'Заполните обязательные поля формы');
            return;
        }
        if (!this.category) {
            this.category = new Category();
        }
        this.category.name = this.form.get('name')?.value;
        this.category.modelId = this.form.get('model')?.value.id;
        this.category.img = this.form.get('image')?.value;

        this.save.emit(this.category);
    }

    onCancel(): void {
        this.cancel.emit();
    }

    fileChanged(event: NzUploadChangeParam): void {
        if (event.type === 'success') {
            this.file = [event.file];
            const fileUrl = this.file[0].response.key;
            (this.form.get('image') as AbstractControl).setValue(fileUrl);
        }
    }

    private getModelByCategory(category: Category): Model {
        return !this.category ? this.models[0] : (this.models.find(model => model.id === category.modelId) as Model);
    }
}
