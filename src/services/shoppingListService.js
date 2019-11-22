/* generated via createView script */
import ServiceBase from './serviceBase';

class ShoppingListService extends ServiceBase {
    constructor() {
        super('shoppingLists');
    }
    addPromotionToList = (id, promotion) => {
        return this.api.put(`/${this.entity}/${id}/add-promotion`, promotion)
    }
    addProductToList = (id, product) => {
        return this.api.put(`/${this.entity}/${id}/add-promotion`, product)
    }
    getShoppingItems = (id) => {
        return this.api.get(`${this.entity}/${id}/items`).then(res => res.data);
    }
}

export default new ShoppingListService();