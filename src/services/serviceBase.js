import apiBase from './apiBase';

const encodeParams = (filter) => {
    let params = [];
    for (let key in filter) {
        params.push(`${key}=${filter[key]}`);
    }
    return params.join('&');
}
class ServiceBase {
    constructor(entity) {
        this.entity = entity;
        this.api = apiBase
    }

    query(filter) {
        const params = encodeParams(filter);
        return this.api.get(`/${this.entity}${params ? '?'+params : ''}`)
            .then(res => res.data);
    }
    getItem(id) {
        return this.api.get(`/${this.entity}/${id}`);
    }
    addItem(items) {
        return this.api.post(`/${this.entity}`, items).then(res => res.data);
    }
    updateItem(id, item) {
        return this.api.put(`/${this.entity}/${id}`, item);
    }
    deleteItem(id) {
        return this.api.delete(`/${this.entity}/${id}`);
    }
}

export default ServiceBase;