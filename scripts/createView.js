const pluralize = require('pluralize');
const _ = require('lodash');
const fs = require('fs');
const srcDir = '../src';
const componentFolder = `${srcDir}/components`
const serviceDir = `${srcDir}/services`

const args = process.argv.splice(2);

const entityName = args[0];
const entityPlural = pluralize.plural(entityName);

const serviceFileName = `${entityName}Service`;
const serviceName = _.capitalize(serviceFileName);

const serviceTemplate = `import ServiceBase from './serviceBase';
    class ${serviceName} extends ServiceBase {
        constructor() {
            super('${entityPlural}');
        }
    }

    export default new ${serviceName}();`

fs.appendFileSync(__dirname + `/${serviceDir}/${serviceFileName}.js`, serviceTemplate);

// get args
// create service
// create grid
// create view
// add the view in nav


