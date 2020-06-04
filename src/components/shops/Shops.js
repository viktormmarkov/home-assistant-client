
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import shopService from '../../services/shopService';

class Shops extends EntityListBaseComponent {
  constructor(props){
    super(props);
    this.entityName = 'shops';
    this.service = shopService;
  }
}

export default Shops;