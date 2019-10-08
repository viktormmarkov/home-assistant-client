import apiBase from './apiBase';

class UserService {
    query() {
        return apiBase.get('/users');
    }
    getItem(id) {
        return apiBase.get(`/users/${id}`);
    }
}

export default new UserService();
