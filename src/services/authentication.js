import apiBase from './apiBase';

class Authentication {
    login(credentials) {
        return apiBase.post('/login', credentials);
    }
    register(user) {
        return apiBase.post('/register', user);
    }
}

export default new Authentication();
