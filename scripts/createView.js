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
import EntityListBaseComponent from '../common/EntityListBaseComponent';
import ${serviceFileName} from '../../services/${serviceFileName}';

class ${_.capitalize(entityPlural)} extends Component {
  render() {
    return (
      <EntityListBaseComponent service={${serviceFileName}} entityName={'${entityPlural}' {...this.props}}/>
    )
  }
}

export default ${_.capitalize(entityPlural)};`

fs.appendFileSync(`${entityComponentFolder}/${componentGridView}.js`, gridTemplate);
//fs.appendFileSync(`${entityComponentFolder}/${componentSingleView}.js`, entityTemplate);

// create grid
// create view
// add the view in nav


