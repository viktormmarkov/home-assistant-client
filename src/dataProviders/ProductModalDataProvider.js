import BaseDataProvider from "./baseDataProvider";
import localeService from "../services/localeService";
import categoryService from "../services/categoryService";

class ProductModalDataProvider extends BaseDataProvider {
    constructor() {
        super();
        this.definitions = [{
            service: localeService,
            action: 'LIST_LOADED',
            keyName: 'locales',
            entityType: 'locale'
        }, 
        {
            service: categoryService,
            action: 'LIST_LOADED',
            keyName: 'categories',
            entityType: 'category'
        }];
    }
}

export default ProductModalDataProvider;