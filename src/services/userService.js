import ServiceBase from './serviceBase';

class UserService extends ServiceBase {
    constructor() {
        super('users');
    }
}

export default new UserService();
