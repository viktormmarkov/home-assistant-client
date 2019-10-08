import apiBase from './apiBase';

class UserService {
    query() {
        return apiBase.get('/users');
    }
}

export default new UserService();
