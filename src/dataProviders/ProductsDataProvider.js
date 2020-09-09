// check existing data in cache
// fetch data
// populate data in stores 
// return up to date data
import productService from '../services/productService';
import categoryService from '../services/categoryService';

class ProductsDataProvider {
    constructor() {
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

    load = async (props) => {
        const loaded = this.definitions.map(({service, action, keyName, entityType}) => {
            if (!props[keyName] || !props[keyName].length) {
                return service.query().then(res => {
                    props.dispatch({type: action, payload: res, entityType});
                });
            }
        });
        return Promise.all(loaded);
    }

    update = () => {

    }

    delete = () => {

    }
}

export default ProductsDataProvider;