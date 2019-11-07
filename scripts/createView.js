const pluralize = require('pluralize');
const _ = require('lodash');
const fs = require('fs');
const srcDir = `${__dirname}/../src`;

const componentFolder = `${srcDir}/components`
const serviceDir = `${srcDir}/services`

const args = process.argv.splice(2);

const entityName = args[0];
const entityPlural = pluralize.plural(entityName);

const serviceFileName = `${entityName}Service`;
const serviceName = _.capitalize(serviceFileName);

const serviceTemplate = `/* generated via createView script */
import ServiceBase from './serviceBase';

class ${serviceName} extends ServiceBase {
    constructor() {
        super('${entityPlural}');
    }
}

export default new ${serviceName}();`

fs.appendFileSync(`${serviceDir}/${serviceFileName}.js`, serviceTemplate);

const entityComponentFolder = `${componentFolder}/${entityPlural}`;

if (!fs.existsSync(entityComponentFolder)){
    fs.mkdirSync(entityComponentFolder);
}

const entityCapitalized = _.capitalize(entityName);
const componentGridView = `${pluralize.plural(entityCapitalized)}`;
const componentSingleView = `${entityCapitalized}`;


const gridTemplate = `
import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ItemRow from '../common/ItemRow'

import ${serviceFileName} from '../../services/${serviceFileName}';

class ${_.capitalize(entityPlural)} extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      loading: false
    };
  }
  componentDidMount() {
    this.getItems();
  }
  getItems() {
    this.setState({loading: true});
    ${serviceFileName}.query()
      .then(res => {
        this.setState({items: res.data, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }

  addItem = () => {
    this.props.history.push("/${entityPlural}/new");
  }

  render() {
    const {items} = this.state
    return (
      <div className="animated fadeIn">
          <div className="section-header">
            <h3 class="inline">${_.capitalize(entityPlural)}</h3>
            <Button onClick={this.addItem} className="fright btn-sm">Add</Button>
          </div>

          <Table responsive hover>
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Date Created</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>
                { items.map((item, index) => 
                    <ItemRow key={index} item={item} entityName={'${entityPlural}'}/>) 
                }
              </tbody>
          </Table>
      </div>
    );
  }
}

export default ${_.capitalize(entityPlural)};`

fs.appendFileSync(`${entityComponentFolder}/${componentGridView}.js`, gridTemplate);
//fs.appendFileSync(`${entityComponentFolder}/${componentSingleView}.js`, entityTemplate);

// create grid
// create view
// add the view in nav


