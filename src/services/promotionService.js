import apiBase from './apiBase';

class UserService {
    query() {
        return apiBase.get('/promotions');
    }
    getItem(id) {
        return apiBase.get(`/promotions/${id}`);
    }
}

export default new UserService();
