
import React from 'react';
import * as _ from 'lodash';
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import localeService from '../../services/localeService';
import { Link } from 'react-router-dom';
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

  getListItem = (item) => {
    return ( <tr key={item._id}>
      <td>
        <Link to={`/${this.entityName}/${item._id}`}>
          {item.language}
        </Link>
      </td>
      <td>{item.createdAt}</td>
      <td>{item._id}</td>
    </tr>)
  }
}

const mapStateToProps = state => ({
  locales: state.locale.list,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Locales);