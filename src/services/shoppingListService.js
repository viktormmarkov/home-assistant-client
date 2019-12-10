/* generated via createView script */
import ServiceBase from './serviceBase';

class ShoppingListService extends ServiceBase {
    constructor() {
        super('shoppingLists');
    }
    addPromotionToList = (id, promotion) => {
        return this.api.put(`/${this.entity}/${id}/add-promotion`, promotion);
    }
    addProductToList = (id, product) => {
        return this.api.put(`/${this.entity}/${id}/add-product`, product);
    }
    removeShoppingItem = (id, itemId) => {
        return this.api.delete(`/${this.entity}/${id}/items/${itemId}`);
    }
    getShoppingItems = (id) => {
        return this.api.get(`${this.entity}/${id}/items`).then(res => res.data);
    }
    inviteUser = (id, email) => {
        return this.api.post(`${this.entity}/${id}/invite-user`, { email });
    }
}

export default new ShoppingListService();