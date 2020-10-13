import ServiceBase from './serviceBase';

class LocaleService extends ServiceBase {
    constructor() {
        super('locales');
    }
    addTranslationKey = (id, translation) => {
        return this.api.post(`/${this.entity}/${id}/add-key`, translation);
    }
}

export default new LocaleService();