import ServiceBase from './serviceBase';

class UserService extends ServiceBase {
    constructor() {
        super('users');
    }
    getProfile = () => {
        return this.api.get(`/${this.entity}/current/profile`).then(res => res.data);
    }
    saveProfile = (update) => {
        return this.api.put(`/${this.entity}/current/profile`, update).then(res => res.data);
    }
    saveProfilePicture = (picture) => {
        return this.api.post(`/${this.entity}/current/profile/picture`, picture).then(res => res.data);
    }
}

export default new UserService();
