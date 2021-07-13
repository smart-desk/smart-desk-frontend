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
        private advertService: ProductService,
        private modelService: ModelService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap((paramMap: ParamMap) => {
                    const advertId = paramMap.get('advert_id');
                    if (advertId) {
                        return this.advertService.getProduct(advertId);
                    }
                    return EMPTY;
                })
            )
            .subscribe(
                (advert: Product): Observable<Model> => {
                    this.product = advert;
                    this.cd.detectChanges();
                    return this.modelService.getModel(advert.model_id);
                }
            );
    }

    save(advert: UpdateProductDto): void {
        this.advertService.updateProduct(this.product.id, advert).subscribe(() => this.router.navigate(['products', this.product.id]));
    }
}
