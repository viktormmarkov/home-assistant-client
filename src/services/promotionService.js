import ServiceBase from './serviceBase';

class PromotionService extends ServiceBase {
    constructor() {
        super('promotions');
    }
}

export default new PromotionService();
