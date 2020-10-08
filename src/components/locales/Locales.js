
import * as _ from 'lodash';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import localeService from '../../services/localeService';
import { connect } from 'react-redux';
import LocalesDataProvider from '../../dataProviders/LocalesDataProvider';


class Locales extends EntityListBaseComponent {
  constructor(props) {
    super(props);
    this.service = localeService; 
    this.entityName = 'locales';
    this.provider = new LocalesDataProvider();
  }

  componentDidMount() {
    this.setState({loading: true});
    this.provider.load(this.props).finally(() => {
      this.setState({loading: false});
    });
  }


  getListItems = () => {
    return this.props.locales;
  }
}

const mapStateToProps = state => ({
  locales: state.locale.list,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Locales);