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
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import ${serviceFileName} from '../../services/${serviceFileName}';

class ${_.capitalize(entityPlural)} extends EntityListBaseComponent {
  constructor(props){
    super(props);
    this.entityName = '${entityPlural}';
    this.service = ${serviceFileName};
  }
}

export default ${_.capitalize(entityPlural)};`;


const entityTemplate = `
import React from "react";
import {EntityBase} from '../common';
import ${serviceFileName} from '../../services/${serviceFileName}';

import {
  Row,
  FormGroup,
  Label,
  Card,
  CardBody,
  Col,
  Input,
} from 'reactstrap';

import EntityMenu from '../common/EntityMenu';
class ${entityCapitalized} extends EntityBase {
  constructor(context) {
    super(context);
    this.entityService = ${serviceFileName};
  }
  render () {
    const {item: ${entityName}} = this.state;
    return (
      <div className="animated fadeIn">
      <div className="section-header">
        <h3 className="inline">${entityCapitalized} {${entityName}.name}</h3>
        <EntityMenu saveItem={this.saveItem} deleteItem={this.deleteItem} entity={${entityName}} {...this.props}/>
      </div>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="Text"
                  value={${entityName}.name}
                  onChange={(event) => this.updateField("name", event.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
    )
  }
}

export default ${entityCapitalized};
`;

fs.appendFileSync(`${entityComponentFolder}/${componentGridView}.js`, gridTemplate);
fs.appendFileSync(`${entityComponentFolder}/${componentSingleView}.js`, entityTemplate);

// create view
// add the view in nav
