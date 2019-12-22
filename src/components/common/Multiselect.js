import _ from 'lodash';
import React, { Component } from 'react';
import Select from 'react-select';

export default class Multiselect extends Component {
    render() {
        const {value, options} = this.props;
        const optionsUpdated = _.map(options, o => ({
            value: o._id,
            label: o.name
        }));
        const valuesUpdated = _.filter(optionsUpdated, o => _.includes(value, o.value));
        const props = _.omit(this.props, 'value', 'options');
        return (
            <Select 
                {...props}
                isMulti
                options={optionsUpdated}
                value={valuesUpdated}
            >
            </Select>
        )
    }
}
