
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import campaignService from '../../services/campaignService';

class Campaigns extends EntityListBaseComponent {
  constructor(props){
    super(props);
    this.entityName = 'campaigns';
    this.service = campaignService;
  }
}

export default Campaigns;