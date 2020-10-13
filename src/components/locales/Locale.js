
import React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { FormGroup, Button, Input, Label, Table } from 'reactstrap';
import { EntityBase } from '../common';
import EntityMenu from '../common/EntityMenu';
import localeService from '../../services/localeService';

const FieldsView = ({updateField, item, translations}) => {
  return <React.Fragment>
    <Table bordered striped hover>
      <thead>
        <tr>
          <th width={"30%"}>
            Key
          </th>
          <th>
            Value
          </th>
        </tr>
      </thead>
    {_.keys(translations).map((i, index) => (
      <tr key={`${i}${index}`}>
        <td>
          <Label htmlFor="name">{i}</Label>
        </td>
        <td>
          <Input
            id="language"
            type="Text"
            value={item.translations[i]}
            onChange={(event) => updateField(`translations.${i}`, event.target.value)}
          />
        </td>
    </tr>
    ))}
    </Table>
  </React.Fragment>
}

const JSONView = ({updateField, item}) => {
  return <FormGroup>
  <Label>Translations</Label>
  <Input
    id="translations"
    type="textarea"
    value={JSON.stringify(item.translations)}
    onChange={(event) => updateField("translations", JSON.parse(event.target.value))}
  />
</FormGroup>
}

class Locale extends EntityBase {
  constructor(props) {
    super(props);
    this.entityService = localeService;
    this.state = {
      ...this.state,
      view: 'field',
      newTranslationField: false,
      translationField: {}
    }
  }

  toggleView = () => {
    const view = this.state.view === 'field' ? 'json' : 'field';
    this.setState({view})
  }

  toggleTranslationField = () => {
    const {newTranslationField} = this.state;
    this.setState({newTranslationField: !newTranslationField, translationField: {}})
  }

  saveTranslationField = () => {
    const {translationField} = this.state;
    const {key, value} = translationField;
    this.updateField(`translations.${key}`, value)
    this.setState({
      translationField: {},
      newTranslationField: false
    });
  }

  updateTranslationField = (name, value) => {
    const { translationField } = this.state;
    const updated = _.set(translationField, name, value);
    this.setState({ translationField: updated });
  }

  render() {
    const { item, translationField, newTranslationField} = this.state;
    const { translations } = item;
    return (
      <div className="animated fadeIn">
        <div className="section-header">
          <h3 className="inline">Add Locale</h3>
          <EntityMenu saveItem={this.saveItem} deleteItem={this.deleteItem} entity={item} {...this.props}/>
        </div>
        <Button onClick={this.toggleView}>{this.state.view}</Button>

        <FormGroup>
          <Label htmlFor="language">Language</Label>
          <Input
            id="language"
            type="Text"
            value={item.language}
            onChange={(event) => this.updateField("language", event.target.value)}
          />
        </FormGroup>
        <hr></hr>
        <Button onClick={this.toggleTranslationField}>Add Translation</Button>
        {newTranslationField ? 
          <React.Fragment> 
            <FormGroup>
              <Label htmlFor="translationField">Key</Label>
              <Input
                id="translationField"
                type="Text"
                value={translationField.key}
                onChange={(event) => this.updateTranslationField("key", event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="translationValue">Value</Label>
              <Input
                id="translationValue"
                type="Text"
                value={translationField.value}
                onChange={(event) => this.updateTranslationField("value", event.target.value)}
              />
            </FormGroup>
            <Button onClick={this.saveTranslationField}>Save</Button> 
          </React.Fragment>
        : null}
        <hr></hr>
        {this.state.view === 'field'? <FieldsView 
          updateField={this.updateField.bind(this)}
          translations={translations}
          item={item}>
        </FieldsView> : 
        <JSONView 
          updateField={this.updateField.bind(this)}
          item={item}>
        </JSONView>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
})



export default connect(mapStateToProps, mapDispatchToProps)(Locale);