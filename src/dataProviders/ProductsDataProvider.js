import BaseDataProvider from './baseDataProvider';
import productService from '../services/productService';
import categoryService from '../services/categoryService';

class ProductsDataProvider extends BaseDataProvider {
    constructor() {
        super();
        this.definitions = [{
            service: productService,
            action: 'LIST_LOADED',
            keyName: 'products',
            entityType: 'product'
        }, 
        {
            service: categoryService,
            action: 'LIST_LOADED',
            keyName: 'categories',
            entityType: 'category'
        }];
    }
}

export default ProductsDataProvider;