import ServiceBase from './serviceBase';

class LocaleService extends ServiceBase {
    constructor() {
        super('locales');
    }
}

export default new LocaleService();