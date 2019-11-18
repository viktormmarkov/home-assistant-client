/* generated via createView script */
import ServiceBase from './serviceBase';

class ShoppingListService extends ServiceBase {
    constructor() {
        super('shoppingLists');
    }
    addPromotionToList = (id, promotion) => {
        this.api.put(`/${this.entity}/${id}/add-promotion`, promotion)
    }
    addProductToList = (id, product) => {
        this.api.put(`/${this.entity}/${id}/add-promotion`, product)
    }
}

export default new ShoppingListService();