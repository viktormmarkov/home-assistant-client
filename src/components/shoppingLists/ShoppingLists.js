import EntityListBaseComponent from '../common/EntityListBaseComponent';
import shoppingListService from '../../services/shoppingListService';

class ShoppingLists extends EntityListBaseComponent {
  constructor(props) {
    super(props);
    this.entityName = 'shoppingLists';
    this.service = shoppingListService;
    this.displayName = 'Shopping Lists'
  }
}

export default ShoppingLists;