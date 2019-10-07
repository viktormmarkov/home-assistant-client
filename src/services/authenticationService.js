import apiBase from './apiBase';

class AuthenticationService {
    login(credentials) {
        return apiBase.post('/login', credentials);
    }
    register(user) {
        return apiBase.post('/register', user);
    }
    checkToken() {
        return apiBase.get('/checkToken');
    }
}

export default new AuthenticationService();
