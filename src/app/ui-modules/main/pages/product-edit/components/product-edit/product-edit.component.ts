import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AbstractFieldFormComponent } from '../../../../../dynamic-fields/models/abstract-field-form.component';
import { EMPTY, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Product } from '../../../../../../modules/product/models/product.entity';
import { Model } from '../../../../../../modules/model/models/model.entity';
import { UpdateProductDto } from '../../../../../../modules/product/models/product.dto';
import { ProductService } from '../../../../../../modules/product/product.service';
import { ModelService } from '../../../../../../modules/model/model.service';
import { ProductStatus } from '../../../../../../modules/product/models/product-status.enum';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent implements OnInit {
    form: FormGroup;
    product: Product;
    protected components: ComponentRef<AbstractFieldFormComponent<any, any>>[] = [];

    constructor(
        private productService: ProductService,
        private modelService: ModelService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private notificationService: NzNotificationService
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap((paramMap: ParamMap) => {
                    const productId = paramMap.get('product_id');
                    if (productId) {
                        return this.productService.getProduct(productId);
                    }
                    return EMPTY;
                })
            )
            .subscribe(
                (product: Product): Observable<Model> => {
                    this.product = product;
                    this.cd.detectChanges();
                    return this.modelService.getModel(product.model_id);
                }
            );
    }

    save(product: UpdateProductDto): void {
        this.productService.updateProduct(this.product.id, product).subscribe(
            () => {
                this.router.navigate(['profile', 'my-products'], { queryParams: { status: ProductStatus.PENDING } });
                this.notificationService.success('Объявление обновлено', 'Идет модерация, это займет некоторое время');
            },
            err => {
                if (err?.error?.statusCode === 400) {
                    this.notificationService.error('Проверьте правильность заполнения формы', err?.error?.message?.join(', '));
                } else {
                    this.notificationService.error('Что-то пошло не так', 'Попробуйте перезагрузить страницу');
                }
            }
        );
    }
}
