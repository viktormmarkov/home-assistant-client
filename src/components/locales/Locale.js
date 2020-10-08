
import React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { FormGroup, Button, Input, Label } from 'reactstrap';
import { EntityBase } from '../common';
import EntityMenu from '../common/EntityMenu';
import localeService from '../../services/localeService';

const FieldsView = ({updateField, item, translations}) => {
  return <React.Fragment>
    {_.keys(translations).map((i, index)=> (
    <FormGroup key={`${i}${index}`}>
      <Label htmlFor="name">{i}</Label>
      <Input
        id="language"
        type="Text"
        value={item.translations[i]}
        onChange={(event) => updateField(`translations.${i}`, event.target.value)}
      />
    </FormGroup>))}
  </React.Fragment>
}

const JSONView = ({updateField, item, translations}) => {
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
      view: 'field'
    }
  }

  toggleView = () => {
    const view = this.state.view === 'field' ? 'json' : 'field';
    this.setState({view})
  }

  render() {
    const { item } = this.state;
    const { translations } = item;
    return (
      <div className="animated fadeIn">
        <div className="section-header">
          <h3 className="inline">Add Locale</h3>
          <EntityMenu saveItem={this.saveItem} deleteItem={this.deleteItem} entity={item} {...this.props}/>
        </div>
        <Button onClick={this.toggleView}>{this.state.view}</Button>

        <FormGroup>
          <Label htmlFor="language">language</Label>
          <Input
            id="language"
            type="Text"
            value={item.language}
            onChange={(event) => this.updateField("language", event.target.value)}
          />
        </FormGroup>
        <hr></hr>
        {this.state.view === 'field'? <FieldsView 
          updateField={this.updateField.bind(this)}
          translations={translations}
          item={item}>
        </FieldsView> : 
        <JSONView 
          updateField={this.updateField.bind(this)}
          translations={translations}
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