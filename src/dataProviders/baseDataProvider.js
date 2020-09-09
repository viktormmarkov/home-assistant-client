// check existing data in cache
// fetch data
// populate data in stores 
// return up to date data

class BaseDataProvider {
    constructor() {
        this.definitions = [];
    }

    get = () => {
        this.definitions.forEach(definition => {
            const {service, store} = definition;
            service.get().then(res => {
                console.log(res);
            });
        });
    }

    update = () => {

    }

    delete = () => {

    }

    load = () => {
        
    }
}