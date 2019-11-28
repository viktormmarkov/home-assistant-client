import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

export default class SmartDropdown extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            selectedItem: {
                value: null,
                text: null
            },
            selectedIndex: null,
        };
    }
    getSelected = (value) => {
        const selectedIndex = _.findIndex(this.props.items, i => i._id === value);
        if (selectedIndex > -1) {
            return this.props.items[selectedIndex];
        } else {
            return {};
        }
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    updateValue = (e) => {
        if (this.props.onChange) {
            this.props.onChange(this.props.items[e.target.value]);            
        }
        this.setState({
            selectedIndex: e.target.value
        });
    }
    render() {
        const {placeholder} = this.state;
        const {valueKey, text, value} = this.props;
        const selected = this.getSelected(value);
        const items = this.props.items || [];
        return (
            <Dropdown isOpen={this.state.isOpen} toggle={() => {this.toggle();}}>
                <DropdownToggle caret>
                    {selected[text] || this.props.placeholder || placeholder}
                </DropdownToggle>
                <DropdownMenu>
                    {items.map((i, index) => (<DropdownItem 
                    key={i[valueKey]} 
                    onClick={this.updateValue} 
                    value={index} 
                    active={index === this.state.selectedIndex}>
                        {i[text]}
                    </DropdownItem>))}
                </DropdownMenu>
            </Dropdown>
        )
    }
}
