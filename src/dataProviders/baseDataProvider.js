// check existing data in cache
// fetch data
// populate data in stores 
// return up to date data

export default class BaseDataProvider {
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

    load = async (props) => {
        const loaded = this.definitions.map(({service, action, keyName, entityType}) => {
            if (!props[keyName] || !props[keyName].length) {
                return service.query().then(res => {
                    props.dispatch({type: action, payload: res, entityType});
                });
            }
        });
        return Promise.all(loaded); 
    }
}