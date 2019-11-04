import apiBase from './apiBase';

class ServiceBase {
    constructor(entity) {
        this.entity = entity;
    }

    query() {
        return apiBase.get(`/${this.entity}`);
    }
    getItem(id) {
        return apiBase.get(`/${this.entity}/${id}`);
    }
    addItem(item) {
        return apiBase.post(`/${this.entity}`, item);
    }
    updateItem(id, item) {
        return apiBase.put(`/${this.entity}/${id}`, item);
    }
    deleteItem(id) {
        return apiBase.delete(`/${this.entity}/${id}`);
    }
}

export default ServiceBase;