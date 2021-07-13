import { FieldEntity } from '../../field/models/field.entity';
import { ProductStatus } from './product-status.enum';

export class Product {
    id: string;
    // tslint:disable-next-line:variable-name
    category_id: string;
    // tslint:disable-next-line:variable-name
    model_id: string;
    title: string;
    userId: string;
    preferContact: string;
    createdAt: Date;
    updatedAt: Date;
    fields: FieldEntity[];
    isBookmark: boolean;
    views: number;
    status: ProductStatus;
}
