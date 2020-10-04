import BaseDataProvider from "./baseDataProvider";
import localeService from "../services/localeService";

class LocalesDataProvider extends BaseDataProvider{
    constructor() {
        super();
        this.definitions = [{
            service: localeService,
            action: 'LIST_LOADED',
            keyName: 'locales',
            entityType: 'locale'
        }];
    }
}

export default LocalesDataProvider;