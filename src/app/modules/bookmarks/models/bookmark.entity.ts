import { Product } from '../../product/models/product.entity';

export class Bookmark {
    id: string;
    userId: string;
    productId: string;
    product: Product;
}
