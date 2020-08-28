import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { NzCascaderOption } from 'ng-zorro-antd';
import arrayToTree from 'array-to-tree';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService, ModelService } from '../../../../shared/services';
import { Category, Field, Section } from '../../../../shared/models/models.dto';
import { FieldFormComponent } from '../../../../shared/components/field-form/field-form.component';
import { getFieldComponentResolver } from '../../../../shared/services/field-resolvers/field-resolvers';
import { FieldTypes } from '../../../../shared/models/field-metadata';
import { FieldSettingsComponent } from '../../../admin/components/field-settings';

@Component({
    selector: 'app-advert-create',
    templateUrl: './advert-create.component.html',
    styleUrls: ['./advert-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertCreateComponent implements OnInit {
    categoryTree$ = new BehaviorSubject<NzCascaderOption[]>([]);
    category: Category[] = [];

    private components: ComponentRef<FieldFormComponent<unknown>>[] = [];

    @ViewChild('fields', { read: ViewContainerRef })
    private fieldsFormContainerRef: ViewContainerRef;

    constructor(
        private modelService: ModelService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.categoryService
            .getCategories()
            .pipe(map(categories => this.transformArrayToTree(categories)))
            .subscribe(tree => this.categoryTree$.next(tree));
    }

    onCategorySelect(categories: Category[]): void {
        if (!categories || !categories.length) {
            return;
        }

        const model_id = categories[categories.length - 1].model_id;

        if (this.fieldsFormContainerRef) {
            this.fieldsFormContainerRef.clear();
        }
        this.modelService.getModel(model_id).subscribe(model => {
            this.populateFormWithInputs(model.sections);
        });
    }

    save(): void {
        this.components.forEach(component => {
            console.log(component.instance.getValue());
        });
    }

    private populateFormWithInputs(sections: Section[]): void {
        sections.forEach(section => {
            if (section.fields) {
                section.fields.forEach(field => {
                    const component = this.resolveFieldComponent(field);
                    this.components.push(component);
                });
            }
        });
    }

    private resolveFieldComponent(field: Field): ComponentRef<FieldFormComponent<unknown>> {
        const resolver = getFieldComponentResolver(this.componentFactoryResolver, field.type as FieldTypes);
        const component = this.fieldsFormContainerRef.createComponent(resolver);

        // add inputs
        component.instance.field = field;

        // run onInit
        component.changeDetectorRef.detectChanges();

        return component;
    }

    private transformArrayToTree(categories: Category[]): NzCascaderOption[] {
        const createNodesTree = (cats: any[]): NzCascaderOption[] => {
            return cats.map(cat => {
                if (cat.children) {
                    cat.children = createNodesTree(cat.children);
                    cat.isLeaf = false;
                    return this.createCascaderOptionFromCategory(cat);
                }
                cat.isLeaf = true;
                return this.createCascaderOptionFromCategory(cat);
            });
        };
        return createNodesTree(arrayToTree(categories));
    }

    private createCascaderOptionFromCategory(category: any): NzCascaderOption {
        return {
            label: category.name,
            value: category,
            children: category.children,
            isLeaf: category.isLeaf,
        };
    }
}
