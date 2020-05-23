import EntityListBaseComponent from '../common/EntityListBaseComponent';
import preferenceService from '../../services/preferenceService';

class Preferences extends EntityListBaseComponent {
  constructor(props) {
    super(props);
    this.entityName = 'preferences';
    this.service = preferenceService;
  }
}

export default Preferences;